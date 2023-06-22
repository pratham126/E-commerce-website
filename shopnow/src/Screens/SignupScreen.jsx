import {Link} from 'react-router-dom';

export default function SigninScreen(){
    return (
    <div className="container-sm">
        <h1 className="my-3 text-center">Sign-up</h1>
        <form action="/shipping" type='post'>
            <div className="mb-3">
                <label className="form-label" htmlFor='name'>Name</label>
                <input className="form-control" id='name' type='text' placeholder='Enter full name' required></input>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor='email'>Email address</label>
                <input className="form-control" id='email' type='email' placeholder='Enter email address' required></input>
            </div>
            <div className="mb-3">
                <label htmlFor="Password" className="form-label">Password</label>
                <input type="password" className="form-control" id="Password" placeholder='Set password'/>
            </div>
            <div className="mb-3">
                <label htmlFor="cnfPassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="cnfPassword" placeholder='Confirm password' />
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="notrobot" required/>
                <label className="form-check-label" htmlFor="notrobot"><span className="mb-1 form-text">I'm not a robot</span></label>
            </div>
            <button type="submit" className="mb-2 btn btn-primary">Submit</button>
            <div className="mb-3">
                <strong>Already a Customer?</strong>{' '}<Link className='Link' to='/signin?redirect=/shipping'>Log-in</Link>
            </div>
        </form>
    </div>)
}