import React from 'react'

export default function page() {
    return(
        <div className="content personinfo">
              <h2>Personal info</h2>
              <p>Please provide your name, email address ,and phone number</p>
              <form onSubmit={handleSubmit}>
                   <label htmlFor="">Name
                   <input 
                      type="text"
                      placeholder='e.g. Stephen King'
                      name='name'
                      value={props.name}
                      onChange={props.handleChange}
                      required
                   />
                   </label>
                   <label htmlFor="">Email Addrss
                   <input 
                      type="email"
                      placeholder='e.g. stephenking@lorem.com'
                      name='email'
                      onChange={props.handleChange}
                      value={props.email}
                      required 
                   />
                   </label>
                   <label htmlFor="">Phone Number
                   <input 
                      type="number"
                      placeholder='e.g. +1 234 567 890'
                      name='phoneNumber'
                      value={props.phoneNumber}
                      onChange={props.handleChange}
                      required 
                   />
                   </label>
                   <div className="buttons">
                        <input type="submit" value="Next Step" />
                    </div>
              </form>
        </div>
   )
}
}
