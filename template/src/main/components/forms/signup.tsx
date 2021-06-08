import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import signupValidateSchema from '../../utilities/validationSchema/signupValidateSchema';
import CountrySelect from '../helping/countryCode';
import { checkValIsNumberOnly } from '../../utilities/common';

interface IFormInput {
  countryCode: string;
  mobile: string;
  email: string;
}

const SignupForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      countryCode: 'IN',
      mobile: '',
      email: ''
    },
    resolver: yupResolver(signupValidateSchema),
    context: undefined,
    criteriaMode: 'all',
    shouldFocusError: true,
    shouldUnregister: true
  });

  const onSubmit: SubmitHandler<IFormInput> = data => {
    console.log(data);
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
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextField
            error={errors.email ? true : undefined}
            helperText={errors.email?.message}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email ID"
            autoComplete="email"
            inputProps={{ inputMode: 'email' }}
            {...field}
          />
        )}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SignupForm;
