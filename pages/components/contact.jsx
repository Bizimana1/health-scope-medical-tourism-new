import React, { useState } from 'react';
import Image from 'next/image';
import { AiOutlineMail, AiOutlineWhatsApp } from 'react-icons/ai';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import axios from 'axios';

const Contact = () => {
 

  const [status, setStatus] = useState(null);
  const [fullName, setfullName] = useState('');
  const [email, setemail] = useState('');
  const [subject, setsubject] = useState('');
  const [message, setmessage] = useState('');

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', fullName);
      formData.append('email', email);
      formData.append('message', message);
      formData.append('subject', subject);

      const response = await axios.post(`https://django-vercel-psi-bice.vercel.app/contact_us/`, formData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setStatus('Email sent successfully!');
        setfullName('');
        setemail('');
        setsubject('');
        setmessage('');
        alert(status);

      } else {
        setStatus('Failed to send email');
        alert(status);
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('An error occurred while sending the email');
    }
  };

  // Helper function to get CSRF token from cookies
  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  return (
    <div className='w-full mb-40 md:mb-0 flex justify-center'>
      <div className='container pb-10'>
        <div className='w-full mt-0 md:mt-40 h-max relative'>
          <div className='w-full mb-40 pt-40  h-screen relative flex justify-center'>
            <Image src='/images/map.svg' alt='map' fill priority />
          </div>
          <div className='w-full h-max px-5 md:px-10 z-10 absolute top-20 left-0 flex justify-center'>
            <div className='w-full h-max flex flex-col md:flex-row'>
              <div className='w-1/2 flex flex-col'>
                <div className='w-full text-3xl md:text-6xl mb-5 mt-20 text-black font-bold'>
                  <h1>Let's talk,</h1>
                  <h1>contact us</h1>
                </div>
                <span className='flex flex-col pb-10 gap-3'>
                  <div className='flex items-center gap-2'>
                    <div className='text-lg text-slate-700'>
                      <HiOutlineLocationMarker />
                    </div>
                    <p className='text-gray-600'>Kigali, Rwanda</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='text-lg text-slate-700'>
                      <AiOutlineWhatsApp />
                    </div>
                    <p className='text-gray-600 flex flex-col'>
                      <span>
                        <a
                          href={`https://wa.me/+250788411549`}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {' '}
                          +250788411549
                        </a>
                      </span>
                      <span>
                        {' '}
                        <a
                          href={`https://wa.me/+250786837318`}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          +250786837318
                        </a>
                      </span>
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='text-lg text-slate-700'>
                      <AiOutlineMail />
                    </div>
                    <p className='text-blue-600'>info@healthscopemed.com</p>
                  </div>
                </span>
              </div>

              <div className='w-full md:w-1/2 flex'>
                <div className='w-full h-max flex flex-col gap-4 max-w-[600px] p-5 border'>
                  <span className='flex gap-2 text-4xl'>
                    <h1 className='text-gray-800'>Send Us A </h1>
                    <h1 className='text-teal-600'>Message </h1>
                  </span>

                  <form className='w-full' onSubmit={handleSubmit}>
                    <span className='w-full flex flex-col gap-4'>
                      <div className='flex flex-col gap-2'>
                        <h1 className='text-sm text-gray-700'>Full name*</h1>
                        <input
                          name='fullName'
                          className='border-b py-1 text-sm outline-none text-gray-600 bg-transparent border-gray-400'
                          value={fullName}
                          onChange={(e) => setfullName(e.target.value)}
                          placeholder='John Doe'
                          type='text'
                        />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <h1 className='text-sm text-gray-700'>
                          Email Address*
                        </h1>
                        <input
                          name='email'
                          className='border-b py-1 text-sm outline-none text-gray-600 bg-transparent border-gray-400'
                          value={email}
                          onChange={(e) => setemail(e.target.value)}
                          placeholder='john@gmail.com'
                          type='email'
                        />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <h1 className='text-sm text-gray-700'>Subject*</h1>
                        <input
                          name='subject'
                          className='border-b py-1 text-sm outline-none text-gray-600 bg-transparent border-gray-400'
                          value={subject}
                          onChange={(e) => setsubject(e.target.value)}
                          placeholder='Product availability'
                          type='text'
                        />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <h1 className='text-sm text-gray-700'>
                          Your Message Here*
                        </h1>
                        <textarea
                          name='message'
                          className='border-b h-32 py-1 text-sm outline-none text-gray-600 bg-transparent border-gray-400'
                          value={message}
                          onChange={(e) => setmessage(e.target.value)}
                          placeholder='e.g John Doe'
                        />
                      </div>

                      <div className='mt-2'>
                        <button className='px-4 py-2 text-white rounded-full bg-teal-600'>
                          Send now
                        </button>
                      </div>
                    </span>
                  </form>
                  {status && <p>{status}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
