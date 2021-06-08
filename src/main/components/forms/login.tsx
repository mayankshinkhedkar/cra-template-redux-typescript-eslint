import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CountrySelect from '../helping/countryCode';
import loginValidateSchema from '../../utilities/validationSchema/loginValidateSchema';
import { checkValIsNumberOnly, setLocalStorage } from '../../utilities/common';
import { useDispatch } from 'react-redux';
import logger from '../../utilities/logger';
import { loginAction } from '../../redux/auth/authSlice';

interface IFormInput {
  countryCode: string;
  mobile: string;
}

const LoginForm = () => {
  const dispatch = useDispatch();

  const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      countryCode: 'IN',
      mobile: ''
    },
    resolver: yupResolver(loginValidateSchema),
    context: undefined,
    criteriaMode: 'all',
    shouldFocusError: true,
    shouldUnregister: true
  });

  const onSubmit: SubmitHandler<IFormInput> = data => {
    logger(data);
    setLocalStorage({ key: 'token', data: '12346545' });
    dispatch(loginAction({ ...data, userType: 'admin' }));
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      width={1}
      sx={{
        mt: 4
      }}
    >
      <Controller
        control={control}
        name="countryCode"
        render={({ field }) => (
          <CountrySelect
            fieldProp={{
              ...field,
              error: errors.countryCode ? true : undefined,
              helperText: errors.countryCode?.message
            }}
          />
        )}
      />
      <Controller
        control={control}
        name="mobile"
        render={({ field }) => (
          <TextField
            error={errors.mobile ? true : undefined}
            helperText={errors.mobile?.message}
            margin="normal"
            required
            fullWidth
            id="mobile"
            label="Mobile Number"
            autoComplete="mobile"
            inputProps={{ inputMode: 'numeric' }}
            {...field}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (checkValIsNumberOnly(event.target.value)) {
                field.onChange(event.target.value);
              }
            }}
          />
        )}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Log In
      </Button>
    </Box>
  );
};

export default LoginForm;
