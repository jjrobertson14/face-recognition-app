import React from 'react';

const Register = ({ onRouteChange }) => {
    return (
        <article className="br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
        <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                        <input 
                          className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                          type="text" 
                          name="name"  
                          id="name" 
                        />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                          className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                          type="email" 
                          name="email-address"  
                          id="email-address" 
                        />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                          className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                          type="password" 
                          name="password"  
                          id="password" 
                        />
                    </div>
                </fieldset>
                <div>
                    <input 
                      className="sign-in b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" 
                      style={{outline: 'unset'}}
                      type="submit" 
                      value="Submit" 
                      onClick={() => onRouteChange('Home')}
                    />
                </div>
            </div>
        </main>
        </article>
    );
}

export default Register;