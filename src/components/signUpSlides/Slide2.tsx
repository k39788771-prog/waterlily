import React, {useState} from 'react';
import Gender from '/src/assets/gender.jpg';

interface SlideProps {
    onNext: (data: string) => void;
    onPrevious: (data: string) => void;
}

export const Slide2 = ({onNext, onPrevious}: SlideProps) => {
    const [answer, setAnswer] = useState('')


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value)
    }

    const handleNext = () => {
        if (answer == '') {
            alert('Field required')
            return
        }
        onNext(answer)
    }

    const handlePrevious = () => {
        onPrevious(answer)
    }

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <div className="flex justify-center">
                <img 
                    src={Gender}
                    alt='bday'
                />
            </div>
            <div className="px-6 py-4">
            <div className="font-extrabold text-xl text-dark-brand mb-2">What's your gender?</div>
            <p className="text-gray-700 text-base">
            this information will help us pick the right plan for your gender
            </p>
        </div>
        <input 
            onSubmit={handleNext}
            onChange={handleChange}
            type='text'
            value={answer}
            placeholder='enter your gender ...'
            className="px-2 py-1 w-3/5 rounded-lg text-md"
        
        />
        <div className="px-6 pt-4 pb-2">
            <button 
                onClick={handlePrevious}
                className="inline-block bg-gray-200 w-[150px] rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >Previous</button>
            <button 
                onClick={handleNext}
                className="inline-block bg-medium-brand w-[150px] rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
                    Next
            </button>
        </div>
        </div>
    )
}

export default Slide2