// src/GuideComponent.jsx
import React, { useState } from 'react';
import '../index.css';

function ProfileLinkage() {
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-1/2 relative">
        <button className="absolute top-4 right-4 text-gray-500" onClick={() => alert('Close guide')}>
          &times;
        </button>
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Confirm The Email</h2>
            <p>We will send you an email to confirm your connection.</p>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Copy The Account ID</h2>
            <p>
              Paste It Into The Input And Submit
              <span className="block bg-gray-200 rounded p-2 mt-2">179-030-4919</span>
            </p>
          </div>
        )}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Choose One Google Ad Account</h2>
            <p>
              Select a Google Ads account
              <span className="block bg-gray-200 rounded p-2 mt-2">179-030-4919</span>
            </p>
          </div>
        )}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Make A New Ad Account (If You Don’t Have One)</h2>
            <p>
              New Google Ads account
            </p>
          </div>
        )}
        {step === 5 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Go To Google Ads Website And Press Sign Up</h2>
            <p>
              <span className="block bg-gray-200 rounded p-2 mt-2">sign up</span>
            </p>
          </div>
        )}
        {step === 6 && (
          <div>
            <h2 className="text-xl font-bold mb-2">To Run Ads Link Your Google Ad Account</h2>
            <p>
              Google Ads ID: 
              <span className="block bg-gray-200 rounded p-2 mt-2">e.g. 123-456-7890</span>
            </p>
          </div>
        )}
        <div className="flex justify-between mt-6">
          <button onClick={prevStep} className="text-white font-black bg-epash-green rounded px-2" disabled={step === 1}>
            &larr;
          </button>
          <div className="flex space-x-2">
            {[...Array(totalSteps)].map((_, i) => (
              <div key={i} className={`h-2 w-2 rounded-full ${step === i + 1 ? 'bg-green-500' : 'bg-gray-300'}`} />
            ))}
          </div>
          <button onClick={nextStep} className="text-white font-black bg-epash-green rounded px-2" disabled={step === totalSteps}>
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileLinkage;
