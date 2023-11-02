import React, { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { url, options } from '../../api'

export const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null)


    const loadOptions = async (inputValue) => {

        return await fetch(`${url}/cities?namePrefix=${inputValue}`, options).then((res) => res.json()).then((res) => {
            return {
                options: res.data.map((city) => {
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}`
                    }
                })
            }
        });
    }
    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }
    return (
        <AsyncPaginate
            placeholder='search'
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
}
