import { useState, ChangeEvent, FormEvent } from 'react';
import { Sub } from '../models';

interface FormState {
    inputValues: Sub;
}

interface IFormProps {
    onNewSub: (newFormSub: Sub) => void;
}

const Form = ({ onNewSub }: IFormProps) => {
    const [inputValues, setInputValues] = useState<FormState['inputValues']>({
        nick: '',
        subMonths: 0,
        avatar: '',
        description: ''
    });
    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        onNewSub(inputValues);
    };

    const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValues({
            ...inputValues,
            [evt.target.name]: evt.target.value
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} value={inputValues.nick} type="text" name="nick" placeholder="nick" />
                <input
                    onChange={handleChange}
                    value={inputValues.subMonths}
                    type="number"
                    name="subMonths"
                    placeholder="subMonths"
                />
                <input
                    onChange={handleChange}
                    value={inputValues.avatar}
                    type="text"
                    name="avatar"
                    placeholder="avatar"
                />
                <textarea
                    onChange={handleChange}
                    value={inputValues.description}
                    name="description"
                    placeholder="description"
                />
                <button>Save new sub!</button>
            </form>
        </div>
    );
};

export default Form;
