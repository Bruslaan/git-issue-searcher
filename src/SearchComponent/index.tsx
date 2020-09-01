import React, { useState } from 'react'
import './index.css'

interface Props {
    onChangeTerm: (term:String) => void
}

const SearchComponent: React.FC<Props> = ({ onChangeTerm }) => {

    const [term, setterm] = useState("")

    const handleInputFieldChange = (event: any) => {
        setterm(event.target.value)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        onChangeTerm(term)
    }

    return (
        <div>
            <form className="search__box" onSubmit={handleSubmit}>
                <input value={term} onChange={handleInputFieldChange} placeholder="Search ..." />
                <button type="submit" value="Submit">Search</button>
            </form>
        </div>
    )
}

export default SearchComponent