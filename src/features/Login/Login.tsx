import React from 'react'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useFormik } from 'formik';
import S from './Login.module.css';

// const validate = (values) => {
//     const errors = {};
//
//     if (!values.password) {
//         errors.password = 'Required';
//     } else if (values.password.length < 8) {
//         errors.password = 'Must be 8 characters or more';
//     }
//
//     if (!values.email) {
//         errors.email = 'Required';
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//         errors.email = 'Invalid email address';
//     }
//
//     return errors;
// };

type FormikErrors = {
    email?: string | null
    password?: string | null
}

export const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormikErrors = {};
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 8) {
                errors.password = 'Must be 8 characters or more';
            }
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },
        onSubmit: values => {
            alert(JSON.stringify(values));
        },
    });
    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>To log in get registered
                                <a href={'https://social-network.samuraijs.com/'} target={'_blank'}> here</a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField label='Email'
                                       type='email'
                                       margin='normal'
                                       {...formik.getFieldProps('email')}/>
                        {/*    initialValues: {  // the values are taken from here*/}
                        {/*    email: '',*/}
                        {/*    password: '',*/}
                        {/*    rememberMe: false,*/}
                        {/*},*/}
                            {formik.errors.email ? <div className={S.error}>{formik.errors.email}</div> : null}
                            <TextField type='password'
                                       label='Password'
                                       margin='normal'
                                       {...formik.getFieldProps('password')}/>
                            {formik.errors.password ? <div className={S.error}>{formik.errors.password}</div> : null}
                            <FormControlLabel label={'rememberMe'}
                                              checked={formik.values.rememberMe}
                                              control={<Checkbox name={'rememberMe'}/>}
                                              {...formik.getFieldProps('rememberMe')}/>
                            <Button type={'submit'}
                                    variant={'contained'}
                                    color={'primary'}
                                    disabled={!!(formik.errors.email || formik.errors.password)}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}