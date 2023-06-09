import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Formik } from "formik"

import { useAuthentication } from "../../hooks/query"
import { Button, TextField, Alert } from '../../shared'

import { signinValidator } from '../../validations'
import { useAuthorization } from '../../hooks'
import './index.scss'


export default function Login() {
    const navigate = useNavigate()
    const { useSignIn } = useAuthentication()
    const { setAuthorization } = useAuthorization()

    const INITIAL_VALUES = {
        username: '',
        password: ''
    }

    const handleSignIn = async (e: any) => {
        const params = {
            userName: e.username,
            password: e.password
        }
        const options = {
            auth: {
                userName: e.username,
                password: e.password
            }
        }
        const response = await useSignIn.mutateAsync({ params, options })
        setAuthorization({
            authorized: true,
            accessToken: response?.accessToken
        })
        navigate('/dashboard')
    }



    return (
        <Formik
            validateOnChange={true}
            validateOnBlur={true}
            validationSchema={signinValidator}
            initialValues={INITIAL_VALUES}
            onSubmit={handleSignIn}
        >
            {({ isValid }) => (
                <Form>
                    <Box sx={{ maxWidth: 600, margin: 'auto', display: 'grid', placeItems: 'center' }} height={'100vh'}>
                        <Stack spacing={2} width={'400px'} >
                            <Box mb={2}>
                                <Typography variant='h5'>
                                    Welcome to Company,
                                </Typography>
                                <Typography variant='h5' gutterBottom>
                                    Sign In to Continue.
                                </Typography>

                                <Typography variant='body2'>
                                    Don't have an account? <Link to={'/register'}>Create an account</Link>
                                    <br />It takes less than a minute
                                </Typography>
                            </Box>
                            <TextField label={'Username'} name={'username'} />
                            <TextField label={'Password'} type={'password'} name={'password'} />

                            <Box mt={2}>
                                <Typography sx={{ mb: 4 }} align='center'>
                                    <Link to={'/forgot'}>
                                        Forgot password?
                                    </Link>
                                </Typography>
                                <Button
                                    disabled={!isValid}
                                    type={'submit'}
                                    variant={'contained'}
                                    sx={{ p: 1, width: '100%' }}>
                                    {
                                        useSignIn.isLoading ? <CircularProgress size={16} sx={{ color: '#fff' }} /> : 'Sign In'
                                    }
                                </Button>
                                <Button variant={'outlined'} sx={{ p: 1, mt: 2, width: '100%' }}>
                                    Back to Home
                                </Button>

                                <Box mt={useSignIn.isError ? 2 : 0}>
                                    <Alert isError={useSignIn.isError} error={useSignIn.error} />
                                </Box>
                            </Box>
                        </Stack>
                    </Box>
                </Form>
            )
            }
        </Formik>
    )
}