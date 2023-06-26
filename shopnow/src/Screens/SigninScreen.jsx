import { useContext, useEffect, useState } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios'
import { Store } from '../components/Store';
import {toast} from 'react-toastify'
import getError from './utils'

export default function SigninScreen(){
    const {search} = useLocation();
    const redirectInURL = new URLSearchParams(search).get('redirect');
    const redirect = redirectInURL? redirectInURL: '/';
    const [email, setemail] = useState();
    const [pswd, setpswd] = useState();
    const {state,dispatch} = useContext(Store);
    const {userInfo} = state;
    const Navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const {data} = await axios.post('/api/users/signin', {
                email: email,
                password: pswd
            });
            dispatch({type: 'User_Signin', payload: data});
            localStorage.setItem('userInfo', JSON.stringify(data));
            Navigate(redirect || '/');
        }catch(err){
            toast.error(getError(err));
        }
    }
    useEffect(()=>{
        if(userInfo)
            Navigate(redirect);
    });
    //Yet to include dependencies in useEffect.
    return (
    <div className="container-sm">
        <h1 className="my-3 text-center">Sign-in</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label" htmlFor='email'>Email address</label>
                <input className="form-control" id='email' type='email' placeholder='Enter email' required onChange={(e) => setemail(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="pswd" className="form-label">Password</label>
                <input type="password" className="form-control" id="pswd" placeholder='Enter password' onChange={(e) => setpswd(e.target.value)}/>
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="notrobot" required/>
                <label className="form-check-label" htmlFor="notrobot"><span className="mb-1 form-text">I'm not a robot</span></label>
            </div>
            <button type="submit" className="mb-2 btn btn-primary">Submit</button>
            <div className="mb-3">
                <strong>New Customer?</strong>{' '}<Link className='Link' to={`/signup?redirect=${redirect}`}>Create your account</Link>
            </div>
        </form>
    </div>)
}