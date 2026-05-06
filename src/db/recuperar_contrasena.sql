USE [SIGMUN]
GO
/****** Object:  StoredProcedure [Rentas].[recuperar_contrasena]    Script Date: 24/07/2025 15:33:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER   PROCEDURE [Rentas].[recuperar_contrasena]
@opcion int = '',
@codigo char(7)='',
@tipo_num_docu char(10)='',
@num_docu char(20) = '',
@email varchar(50)='' ,    
@num_ingr_validacion char(20)='',    
@codigo_confirmacion varchar(100)='',
@nombres varchar(50) = '',
@apellidop varchar(50) = '',
@apellidom varchar(50) = '',
@telefono varchar(20) = '',
@recuperar varchar(1) = ''
AS
SET NOCOUNT ON;
DECLARE @now Datetime = GETDATE()
DECLARE @tiempo_de_enfriamiento_minutos int = 5
DECLARE @vencimiento_confirmacion Datetime = dateadd(minute, @tiempo_de_enfriamiento_minutos, @now)
DECLARE @new_codigo_confirmacion varchar(100) = REPLACE(CONVERT(varchar(100), NEWID()), '-', '')

IF @opcion=1 goto enviar_confirmacion_actualizar
IF @opcion=3 goto validar_confirmacion
IF @opcion=4 goto tiene_correo_asociado
if @opcion=5 goto enviar_confirmacion_recuperar

SELECT '400' as rescode,'PETICION DENEGADA'
return
------------------------------------------------------------------------------------------------------------------------------------------------------
enviar_confirmacion_actualizar:
BEGIN
    IF([Rentas].[fn_tiene_correo](@codigo) = 1)
    BEGIN
        SELECT '400' as rescode, 'YA TIENES UN CORREO ASOCIADO A TU CUENTA' as message
        RETURN
    END

	IF((SELECT top 1 validado FROM [Rentas].[recuperar_clave] WHERE codigo = @codigo and CAST(created_at as date ) = CAST(@now as date)) = 1  )
	BEGIN
		SELECT '400' as rescode,'YA ESTA VALIDADO' as message
		RETURN
	END

    IF(trim(@num_docu) = '') SELECT '400' as rescode,'DEBES INDICAR NUMERO DE IDENTIFICACION' as message

	IF NOT EXISTS(SELECT 1 FROM [Rentas].MContribuyente WHERE codigo = @codigo and num_doc = @num_docu)
	BEGIN
		SELECT '400' as rescode,'CODIGO DE CONTRIBUYENTE O NUMERO DE IDENTIFICACION INVALIDO' as message
		RETURN 
	END
	--SELECT top 1 vencimiento_confirmacion FROM [Rentas].[recuperar_clave] WHERE codigo = '0000025'
	IF(@now < (SELECT top 1 vencimiento_confirmacion FROM [Rentas].[recuperar_clave] WHERE codigo = @codigo and CAST(created_at as date ) = CAST(@now as date)  and validado = 0))
	BEGIN
		SELECT '400' as rescode, CONCAT('AUN DEBES ESPERAR ',@tiempo_de_enfriamiento_minutos,'MIN PARA VOLVER A ENVIARTE UN CODIGO') as message
		RETURN
	END

	IF EXISTS(SELECT 1 FROM [Rentas].[recuperar_clave] WHERE codigo = @codigo and CAST(created_at as date ) = CAST(@now as date))
	BEGIN
		UPDATE [Rentas].[recuperar_clave] 
		SET 
			codigo_confirmacion = @new_codigo_confirmacion, 
			vencimiento_confirmacion = @vencimiento_confirmacion
		WHERE codigo = @codigo
		and CAST(created_at as date ) = CAST(@now as date)

		UPDATE rentas.mcontribuyente 
		SET
		correo_e=@email,
		telefono1 = @telefono
		where codigo = @codigo and num_doc=@num_docu and nestado=1

		SELECT 
			'200' as rescode,
			'ENVIANDO NUEVO CÓDIGO DE VALIDACIÓN' as message 
			,@new_codigo_confirmacion as val
			,@email as email
			,@vencimiento_confirmacion as enfriamiento
		RETURN
	END
	ELSE
	BEGIN
		insert into [Rentas].[recuperar_clave] (
            codigo,--1
            email,--2
            codigo_confirmacion,--3
            --nombres,--5
            num_doc,--6
            --apellido_paterno,--7
            --apellido_materno,--8
            telefono,--9
            vencimiento_confirmacion,--10
			accion
		)
		values(
            @codigo,--1
            @email,--2
            @new_codigo_confirmacion,--3
            --@nombres,--5
            @num_docu,--6
            --@apellidop,--7
            --@apellidom,--8
            @telefono,--9
            @vencimiento_confirmacion--10
			,'actualizar' --accion
		)
		SELECT 
            '200' as rescode
            ,'ENVIANDO NUEVO CÓDIGO DE VALIDACIÓN' as message 
            ,@new_codigo_confirmacion as val
            ,@email as email
            ,@vencimiento_confirmacion as enfriamiento
		RETURN
	END
	
END
------------------------------------------------------------------------------------------------------------------------------------------------------
validar_confirmacion:
BEGIN
	IF NOT EXISTS(SELECT 1 FROM [Rentas].[recuperar_clave] WHERE codigo_confirmacion = @codigo_confirmacion and CAST(created_at as date ) = CAST(@now as date))
	BEGIN
		SELECT '400' as rescode, 'ACCION INVALIDA' as message
		return
	END

	IF(@now < (SELECT top 1 vencimiento_confirmacion FROM [Rentas].[recuperar_clave] WHERE codigo_confirmacion = @codigo_confirmacion and validado = 0 and CAST(created_at as date ) = CAST(@now as date)))
	BEGIN
		Declare @new_password varchar(20)  = CONVERT(bigint,RAND() * 8999999999 + 1000000000)
		Declare @_accion varchar(20),@_codigo varchar(7)
		Declare @_email varchar(50),@_telefono varchar(20)

	
		select top 1 
			@_accion = accion
			,@_codigo = codigo
			,@_email = email
			,@_telefono = telefono
		FROM [Rentas].[recuperar_clave] 
		WHERE codigo_confirmacion = @codigo_confirmacion 

		IF (@_accion = 'actualizar')
		BEGIN
			--select 'A'
			UPDATE [Rentas].[MContribuyente] 
			SET 
				password = @new_password
				,telefono1 = @_telefono
				,correo_e = @_email
			OUTPUT 
				'200' as rescode,
				'VERIFICADO EXITOSAMENTE' as message,
				INSERTED.codigo, 
				INSERTED.password as val, 
				INSERTED.correo_e as email
			WHERE codigo = @_codigo
		END
		ELSE IF (@_accion = 'recuperar')
		BEGIN
			--select 'B'
			UPDATE [Rentas].[MContribuyente] 			
			SET 
				password = @new_password
			OUTPUT 
				'200' as rescode,
				'VERIFICADO EXITOSAMENTE' as message,
				INSERTED.codigo, 
				INSERTED.password as val, 
				INSERTED.correo_e as email
			WHERE codigo = @_codigo

			/*SELECT 
			'200' as rescode
			,'VERIFICADO EXITOSAMENTE' as message
			,password as val
			,correo_e as email
			,codigo as codigo
			--,TRIM(paterno)+' '+TRIM(materno)+' '+TRIM(nombres) as nombre_completo
			FROM [Rentas].[MContribuyente] where codigo = @codigo*/
		END 
		ELSE 
		BEGIN
			SELECT '400' as rescode, 'OCURRIO UN ERROR AL INTENTAR ACTUALIZAR O RECUPERAR' as message
			RETURN
		END

		UPDATE [Rentas].[recuperar_clave]
        SET 
            validado = 1
		WHERE codigo_confirmacion = @codigo_confirmacion
	END
	ELSE
	BEGIN
		SELECT '400' as rescode, 'ESTE CODIGO ESTA VALIDADO O VENCIDO' as message
		RETURN
	END
	RETURN
END
------------------------------------------------------------------------------------------------------------------------------------------------------
tiene_correo_asociado:
BEGIN
	IF NOT EXISTS (SELECT 1 FROM [Rentas].MContribuyente WHERE codigo = trim(@codigo) AND num_doc = trim(@num_docu))
	BEGIN
		;THROW 52000, 'CODIGO DE CONTRIBUYENTE O DOCUMENTO DE IDENTIFICACION INVALIDO', 400
	END
    IF EXISTS(SELECT 1 FROM [Rentas].MContribuyente WHERE codigo = trim(@codigo) AND num_doc = trim(@num_docu) and correo_e LIKE '%@%.%')
    BEGIN
        SELECT TOP 1
            '200' as rescode
            ,1 as message
            ,LEFT(correo_e, 2) + '******' + SUBSTRING(correo_e, CHARINDEX('@', correo_e)-2, LEN(correo_e)) as correo_enmascarado 
			,correo_e as email
        FROM [Rentas].MContribuyente WHERE codigo = trim(@codigo) AND num_doc = trim(@num_docu) and correo_e LIKE '%@%.%'
    END
    ELSE
    BEGIN
        SELECT '200' as rescode, 0 as message, '' as correo_enmascarado
    END
    RETURN
END


enviar_confirmacion_recuperar:
BEGIN
	IF NOT EXISTS(SELECT 1 FROM [Rentas].MContribuyente WHERE codigo = trim(@codigo) AND num_doc = trim(@num_docu))
	BEGIN
		SELECT '400' as rescode, 'CODIGO DE CONTRIBUYENTE O DOCUMENTO DE IDENTIFICACION INVALIDO' as message
		RETURN 
	END
	
	IF EXISTS(SELECT 1 FROM [Rentas].recuperar_clave WHERE codigo = @codigo and num_doc = @num_docu and validado = 1 and CAST(created_at as date ) = CAST(@now as date))
	BEGIN
		SELECT '400' as rescode, 'YA ESTA VALIDADO, HOY NO PUEDE VOLVER A SOLICITAR UN CODIGO DE VALIDACION' as message
		RETURN
	END

	IF(@now < (SELECT top 1 vencimiento_confirmacion 
				FROM [Rentas].[recuperar_clave] 
				WHERE codigo = @codigo 
				and num_doc = @num_docu 
				and validado = 0 
				and CAST(created_at as date ) = CAST(@now as date)))
	BEGIN
		SELECT '400' as rescode, CONCAT('AUN DEBES ESPERAR ',@tiempo_de_enfriamiento_minutos,' MIN PARA VOLVER A ENVIARTE UN CODIGO') as message
		RETURN
	END

	IF EXISTS(SELECT 1 FROM [Rentas].recuperar_clave WHERE codigo = @codigo and num_doc = @num_docu and validado = 0 and CAST(created_at as date ) = CAST(@now as date))
	BEGIN
		UPDATE [Rentas].recuperar_clave 
		SET 
			codigo_confirmacion = @new_codigo_confirmacion,
			vencimiento_confirmacion = @vencimiento_confirmacion
		WHERE codigo = @codigo 
		and num_doc = @num_docu 
		and validado = 0
		and CAST(created_at as date ) = CAST(@now as date)

		SELECT 
			'200' as rescode, 
			'ENVIANDO NUEVO CODIGO DE VALIDACIONnn' as message, 
			@new_codigo_confirmacion as val, 
			@email as email, 
			@vencimiento_confirmacion as enfriamiento
		RETURN
	END
	ELSE
	BEGIN
		SET @email = trim((SELECT TOP 1 correo_e FROM [Rentas].MContribuyente WHERE codigo = @codigo and trim(num_doc) = @num_docu))
		SELECT 
			'200' as rescode, 
			'ENVIANDO NUEVO CODIGO DE VALIDACION2222' as message, 
			@new_codigo_confirmacion as val, 
			@email as email, 
			@vencimiento_confirmacion as enfriamiento
		
		INSERT INTO [Rentas].recuperar_clave (
			codigo,
			codigo_confirmacion,
			num_doc,
			email,
			vencimiento_confirmacion,
			accion
		)
		VALUES(
			@codigo,
			@new_codigo_confirmacion,
			@num_docu,
			@email,
			@vencimiento_confirmacion,
			'recuperar' --accion
		)
		
	END
	RETURN
END