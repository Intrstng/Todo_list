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
import { loginTC } from './reducers/loginReducer';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { authIsLoggedInSelector } from './selectors/authSelector';
import { Navigate } from 'react-router-dom';


export const Login = () => {
    const isLoggedIn = useAppSelector<boolean>(authIsLoggedInSelector);
    const dispatch = useAppDispatch();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
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
            dispatch(loginTC(values));
            formik.resetForm(); // в then dispatch( )loadingTC) если success
        },
    });

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }
    // Добавить эти редиректы нужно непосредственно перед return, то есть после всех хуков, которые используются внутри компонент, иначе будет нарушено правило работы с хуками, говорящее, что нельзя использовать хуки внутри компоненты в условной логике.

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
                                       {...formik.getFieldProps('email')}
                                       onBlur={formik.handleBlur}
                            />
                        {/*    initialValues: {  // the values are taken from here*/}
                        {/*    email: '',*/}
                        {/*    password: '',*/}
                        {/*    rememberMe: false,*/}
                        {/*},*/}
                            {formik.touched.email && formik.errors.email ? <div className={S.error}>{formik.errors.email}</div>
                                                                         : null}
                            <TextField type='password'
                                       label='Password'
                                       margin='normal'
                                       {...formik.getFieldProps('password')}
                                       onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password ? <div className={S.error}>{formik.errors.password}</div>
                                                                                : null}
                            <FormControlLabel label={'Remember me'}
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

// TYPES
type FormikErrors = {
    email?: string
    password?: string
    rememberMe?: boolean
}