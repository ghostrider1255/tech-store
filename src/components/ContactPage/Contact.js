import React from 'react';
import Title from '../Title';
export default function Contact() {
    return (
    <section className="py-5">
        <div className="row">
            <div className="col-10 mx-auto col-md-6 my-3">
                <Title title="contact us"></Title>
                <form className="mt-5">
                    <div className="form-group">
                        <input type="text" name="firstname" className="form-control" placeholder="first name"></input>                        
                    </div>
                    <div className="form-group">
                        <input type="email" name="email" className="form-control" placeholder="email@email.com"></input>
                    </div>
                    <div className="form-group">
                        <input type="text" name="subject" className="form-control" placeholder="important!!!"></input>
                    </div>
                    <div className="form-group">
                        <textarea name="message" className="form-control" rows="10" placeholder="message goes here"></textarea>
                    </div>
                    <div className="form-group mt-3">
                        <input type="submit" value="send" className="form-control bg-primary text-white"></input>
                    </div> 
                </form>
            </div>
        </div>
    </section>
    )
}
