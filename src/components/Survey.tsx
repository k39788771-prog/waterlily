import React, {useEffect, useState} from 'react';

import Slide1 from '/home/algo-env/Desktop/waterlily/waterlily-app/src/components/signUpSlides/Slide1.tsx';
import Slide2 from '/home/algo-env/Desktop/waterlily/waterlily-app/src/components/signUpSlides/Slide2.tsx';
import Slide3 from '/home/algo-env/Desktop/waterlily/waterlily-app/src/components/signUpSlides/Slide3.tsx';
import Slide4 from '/home/algo-env/Desktop/waterlily/waterlily-app/src/components/signUpSlides/Slide4.tsx';


function Survey() {
    const [count, setCount] = useState(1)
    const [surveyDict, setSurveyDict] = useState({1:'',2:'',3:'',4:''})

    const handleNext = (slideAnswer: string) => {
        setCount(count+1)
        setSurveyDict(prevData => ({
            ...prevData,
            [count]: slideAnswer
        }))
        useEffect( () => {console.log(surveyDict)}, [surveyDict])
    }

    const handlePrevious = () => {
        if (count > 1) {
            setCount(count-1)
        }
    }


    const handleSubmission = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const token = localStorage.getItem('token')
        try {
            e.preventDefault()
            const response = await fetch('http://localhost:5000/survey_data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(surveyDict)
            })
            if (!response.ok) {
                throw new Error('HTTP error! status: ' + response.status)
            } else {
                const responseData = await response.json()
                console.log('response: ' + responseData)
                // close modal or navigate to best plan for you page
            }
    
        } catch (error){
            console.log('Error: '+ error)
        }

    }

    return (
        <div className="overflow-hidden rounded bg-white shadow-lg shadow-white">
            
            {count < 5 && 
            <div className="py-2 font-extrabold text-3xl text-dark-brand ">Tell us about yourself!</div>

            }
            {count > 4 && 
            <div className="py-2 px-2 font-extrabold text-3xl text-dark-brand ">Here are your answers:</div>

            }
            
            <div className="px-2 bg-white max-w-sm">
                {count == 1 && 
                    <Slide1 onNext={handleNext} onPrevious={handlePrevious} />
                }
                {count == 2 && 
                    <Slide2 onNext={handleNext} onPrevious={handlePrevious} />
                }
                {count == 3 && 
                    <Slide3 onNext={handleNext} onPrevious={handlePrevious} />
                } 
                {count == 4 && 
                    <Slide4 onNext={handleNext} onPrevious={handlePrevious} />
                }  
                {count == 5 && 
                    <div key='review answers'>
                        <div className="font-bold text-xl text-black py-2 text-left">
                            Q1 {surveyDict[1]}  
                        </div>
                        <div className="font-bold text-xl text-black py-2 text-left">
                            Q2 {surveyDict[2]}  
                        </div>
                        <div className="font-bold text-xl text-black py-2 text-left">
                            Q3 {surveyDict[3]}  
                        </div>
                        <div className="font-bold text-xl text-black py-2 text-left">
                            Q4 {surveyDict[4]}  
                        </div>                        
                        <div className="px-6 pt-4 pb-2">
                        <button 
                                onClick={handlePrevious}
                                className="inline-block bg-gray-200 w-[150px] rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                            >Previous</button>
                            <button 
                                onClick={handleSubmission}
                                className="inline-block bg-medium-brand w-[150px] rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
                                    Submit
                            </button>


                        </div>
                    </div>
                }

            </div>
        </div>
    )


}

export default Survey;