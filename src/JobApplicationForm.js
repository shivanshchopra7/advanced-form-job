import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './style.css';

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    countryCode: '',
    position: 'Developer',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: {
      javascript: false,
      css: false,
      python: false,
    },
    interviewTime: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!formData.fullName) tempErrors.fullName = "Full Name is required.";
    if (!formData.email) tempErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is invalid.";
    if (!formData.phoneNumber) tempErrors.phoneNumber = "Phone Number is required.";
    else if (!/^\d+$/.test(formData.phoneNumber)) tempErrors.phoneNumber = "Phone Number must be a valid number.";
    if ((formData.position === 'Developer' || formData.position === 'Designer') && !formData.relevantExperience) tempErrors.relevantExperience = "Relevant Experience is required.";
    else if (formData.relevantExperience <= 0) tempErrors.relevantExperience = "Relevant Experience must be a number greater than 0.";
    if (formData.position === 'Designer' && !formData.portfolioURL) tempErrors.portfolioURL = "Portfolio URL is required.";
    else if (formData.portfolioURL && !/^(https?:\/\/|www\.)[^\s$.?#].[^\s]*$/.test(formData.portfolioURL)) tempErrors.portfolioURL = "Portfolio URL is invalid.";
    if (formData.position === 'Manager' && !formData.managementExperience) tempErrors.managementExperience = "Management Experience is required.";
    if (!Object.values(formData.additionalSkills).includes(true)) tempErrors.additionalSkills = "At least one skill must be selected.";
    if (!formData.interviewTime) tempErrors.interviewTime = "Preferred Interview Time is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        additionalSkills: {
          ...formData.additionalSkills,
          [name]: checked
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handlePhoneChange = (value, country) => {
    setFormData({
      ...formData,
      phoneNumber: value.replace(/[^0-9]+/g, ''),
      countryCode: country.dialCode
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="container">
      {submitted ? (
        <div className="summary">
          <h2>Application Summary</h2>
          <p><strong>Full Name:</strong> {formData.fullName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone Number:</strong> {`+${formData.countryCode} ${formData.phoneNumber}`}</p>
          <p><strong>Applying for Position:</strong> {formData.position}</p>
          {(formData.position === 'Developer' || formData.position === 'Designer') && (
            <p><strong>Relevant Experience:</strong> {formData.relevantExperience} years</p>
          )}
          {formData.position === 'Designer' && (
            <p><strong>Portfolio URL:</strong> {formData.portfolioURL}</p>
          )}
          {formData.position === 'Manager' && (
            <p><strong>Management Experience:</strong> {formData.managementExperience}</p>
          )}
          <p><strong>Additional Skills:</strong> {Object.keys(formData.additionalSkills).filter(skill => formData.additionalSkills[skill]).join(', ')}</p>
          <p><strong>Preferred Interview Time:</strong> {formData.interviewTime}</p>
        </div>
      ) : (
        <>
          <h1>Job Application</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name:</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
              {errors.fullName && <p className="error">{errors.fullName}</p>}
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="form-group">
              <label>Phone Number:</label>
              <PhoneInput
                country={'us'}
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                inputStyle={{ width: '100%' }}
                containerStyle={{ width: '100%', marginBottom: '15px' }}
              />
              {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
            </div>
            <div className="form-group">
              <label>Applying for Position:</label>
              <select name="position" value={formData.position} onChange={handleChange}>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
            {(formData.position === 'Developer' || formData.position === 'Designer') && (
              <div className="form-group">
                <label>Relevant Experience (years):</label>
                <input type="number" name="relevantExperience" value={formData.relevantExperience} onChange={handleChange} />
                {errors.relevantExperience && <p className="error">{errors.relevantExperience}</p>}
              </div>
            )}
            {formData.position === 'Designer' && (
              <div className="form-group">
                <label>Portfolio URL:</label>
                <input type="text" name="portfolioURL" value={formData.portfolioURL} onChange={handleChange} />
                {errors.portfolioURL && <p className="error">{errors.portfolioURL}</p>}
              </div>
            )}
            {formData.position === 'Manager' && (
              <div className="form-group">
                <label>Management Experience:</label>
                <textarea name="managementExperience" value={formData.managementExperience} onChange={handleChange} />
                {errors.managementExperience && <p className="error">{errors.managementExperience}</p>}
              </div>
            )}
            <div className="form-group">
              <label>Additional Skills:</label>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" name="javascript" checked={formData.additionalSkills.javascript} onChange={handleChange} />
                  Javascript
                </label>
                <label>
                  <input type="checkbox" name="css" checked={formData.additionalSkills.css} onChange={handleChange} />
                  CSS
                </label>
                <label>
                  <input type="checkbox" name="python" checked={formData.additionalSkills.python} onChange={handleChange} />
                  Python
                </label>
              </div>
              {errors.additionalSkills && <p className="error">{errors.additionalSkills}</p>}
            </div>
            <div className="form-group date-time-picker">
              <label>Preferred Interview Time:</label>
              <input type="datetime-local" name="interviewTime" value={formData.interviewTime} onChange={handleChange} />
              {errors.interviewTime && <p className="error">{errors.interviewTime}</p>}
            </div>
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </div>
  );
};

export default JobApplicationForm;
