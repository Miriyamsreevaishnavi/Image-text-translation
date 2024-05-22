import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Send } from '@mui/icons-material';

interface FormValues {
  englishText: string;
}

const SpecialTranslator: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();
  const [loading, setLoading] = React.useState(false);
  const [translation, setTranslation] = React.useState<string | undefined>();

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    setLoading(true);
    // Simulate translation process with a timeout
    setTimeout(() => {
      setTranslation('Hello, World!'); // Set a simple "Hello, World!" message
      setLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} alignItems="center">
        <Typography variant="h4" textAlign="center">
          English to Hindi Translator
        </Typography>
        <Controller
          name="englishText"
          control={control}
          rules={{ required: 'Please enter English text' }}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{
                width: '90%',
              }}
              multiline
              rows={5}
              label="Enter English text"
              error={!!errors.englishText}
              helperText={errors.englishText?.message}
            />
          )}
        />
        <LoadingButton
          type="submit"
          endIcon={<Send />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          <span>Translate</span>
        </LoadingButton>
      </Stack>
      {translation && (
        <Paper sx={{ p: 2, my: 4 }}>
          <Typography variant="body1">Hindi Translation: {translation}</Typography>
        </Paper>
      )}
    </form>
  );
};

export default SpecialTranslator;

