import { loader } from 'graphql.macro'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'

import client from 'services/graphql/client'

import classes from './index.module.scss'

const exampleMutation = loader('../../graphql/createUser.graphql')

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(4, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(12, 'Too Long!')
    .required('Required')
})

const SignUp = () => {
  const [runExampleMutation] = useMutation(exampleMutation, { client })
  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const { data } = await runExampleMutation({ variables: values })
      window.alert(JSON.stringify(data))
    } catch (err) {
      window.alert(err.mesage)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>

            <label htmlFor='firstName'>First Name</label>
            <Field name='firstName' className={classes.field} />

            {errors.firstName && touched.firstName ? (<div>{errors.firstName}</div>) : null}
            <ErrorMessage name='firstName' />

            <label htmlFor='lastName'>Last Name</label>
            <Field name='lastName' className={classes.field} />

            {errors.lastName && touched.lastName ? (<div>{errors.lastName}</div>) : null}
            <ErrorMessage name='lastName' />

            <label htmlFor='email'>Email</label>
            <Field name='email' type='email' className={classes.field} />

            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <ErrorMessage name='email' />

            <label htmlFor='password'>Password</label>
            <Field name='password' type='password' className={classes.field} />

            <button type='submit' disabled={isSubmitting}>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SignUp
