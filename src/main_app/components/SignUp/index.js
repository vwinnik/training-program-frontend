import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(4, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required')
})

const SignUp = () => (
    <div>
        <h1>Sign Up</h1>
        <Formik
        initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, actions) => {
            await sleep(500);
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
        }}
        >
        {({ isSubmitting, errors, touched }) => (
            <Form>

            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" />
            {errors.firstName && touched.firstName ? (
                <div>{errors.firstName}</div>
            ) : null}<br></br>
            
            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" />
            {errors.lastName && touched.lastName ? (
                <div>{errors.lastName}</div>
            ) : null}<br></br>

            <label htmlFor="email">Email</label>
            <Field name="email" type="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}<br></br>

            <label htmlFor="password">Password</label>
            <Field name="password" type="password" /><br></br>

            <button type="submit" disabled={isSubmitting}>Submit</button>

            </Form>
        )}
        </Formik>
    </div> 
)

export default SignUp
