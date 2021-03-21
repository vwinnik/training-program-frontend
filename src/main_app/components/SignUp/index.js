import { useState } from 'react'
import { loader } from 'graphql.macro'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useMutation, Mutation } from '@apollo/client'

import client from 'services/graphql/client'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

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
  const [state, setState] = useState ({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })
  const { loading, error, data } = useMutation(exampleMutation, { client })
  console.log(loading, error, data)

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
      onSubmit={async (values, actions) => {
        await sleep(500)
        alert(JSON.stringify(values, null, 2))
        actions.setSubmitting(false)
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form onSubmit={e => e.preventDefault()}>

          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" value={state.firstName} onChange={e => setState({ firstName: e.target.value })} />
          {errors.firstName && touched.firstName ? (
            <div>{errors.firstName}</div>
          ) : null}
          <ErrorMessage name="firstName" />

          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" value={state.lastName} onChange={e => setState({ lastName: e.target.value })} />
          {errors.lastName && touched.lastName ? (
            <div>{errors.lastName}</div>
          ) : null}
          <ErrorMessage name="lastName" />

          <label htmlFor="email">Email</label>
          <Field name="email" type="email" value={state.email} onChange={e => setState({ email: e.target.value })} />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          <ErrorMessage name="email" />

          <label htmlFor='password'>Password</label>
          <Field name='password' type='password' value={state.password} onChange={e => this.state({ password: e.target.value })} />

          <Mutation mutation={data}>
            {mutation => (
              <button 
                onclick={() =>
                  mutation({
                    variables: {
                      input: state
                    }
                  })
                }  
                type='submit' disabled={isSubmitting}>Submit</button>)}
          </Mutation>
        </Form>
      )}
    </Formik>
  </div>
)
}

export default SignUp
