import * as React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/core/Autocomplete';
import csc from 'country-state-city';

interface CountrySelectProps {
  fieldProp?: any;
}

export default function CountrySelect (props: CountrySelectProps) {
  const { fieldProp } = props;

  return (
    <Autocomplete
      id="country-select"
      options={csc.getAllCountries()}
      autoHighlight
      autoComplete
      fullWidth
      getOptionLabel={(option) => {
        return `${option.flag} ${option.name} (${option.isoCode}) +${option.phonecode}`;
      }}
      defaultValue={csc.getAllCountries().find(d => d.isoCode === fieldProp?.value)}
      onChange={(event, newValue) => {
        if (newValue) {
          fieldProp.onChange(newValue.isoCode);
        } else {
          fieldProp.onChange('');
        }
      }}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ fontSize: 15, '& > span': { mr: '10px', fontSize: 18 } }}
          {...props}
        >
          <span>{option.flag}</span>
          {option.name} ({option.isoCode}) +{option.phonecode}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Country"
          margin="normal"
          required
          fullWidth
          inputProps={{
            ...params.inputProps
          }}
          {...fieldProp}
        />
      )}
    />
  );
}
