import React from 'react';
import Title from '../Title'
import aboutBcg from '../../images/aboutBcg.jpeg';

export default function Info() {
    return (
        <section className="py-5">
            <div className="container">
                <div className="row">
                    <div className="col-10 mx-auto col-md-6 my-3">
                        <img src={aboutBcg} className="img-fluid img-thumbnail" alt="about us" style={{background: 'var(--darkGrey)'}}></img>
                    </div>
                    <div className="col-10 mx-auto col-md-6 my-3">
                        <Title title="about us" ></Title>
                        <p className="text-lead text-muted my-3">lorem ipsum dolor site 
                        amet consumer dash dash dash , notsue
                        dkadado kdiea , ioeam doo to the ei aoe 
                        azooem aoeieyaome o vodoi re  </p>
                        <p className="text-lead text-muted my-3">lorem ipsum dolor site 
                        amet consumer dash dash dash , notsue
                        dkadado kdiea , ioeam doo to the ei aoe 
                        azooem aoeieyaome o vodoi re  </p>
                        <button className="main-link"  type="button" style={{margin:'2rem'}}>more info</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
