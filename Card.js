import { Fragment, useState, useCallback } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import Search from '../icons/Search';
import { Label } from './Label';

const ComboBox = ({
    disabled,
    label,
    name,
    options,
    selectedOption,
    errors,
    onChangeValue,
}) => {
    const [selected, setSelected] = useState(selectedOption || '');
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const memoizedOnChangeValue = useCallback(
        (option) => {
            option && onChangeValue(name, option.value, { shouldValidate: true });
        },
        [name, onChangeValue]
    );

    const handleOptionChange = (option) => {
        setSelected(option);
        memoizedOnChangeValue(option);
        setIsOpen(false);
    };

    const filteredOptions =
        query === ''
            ? options
            : options.filter((option) =>
                  option.label
                      .toLowerCase()
                      .replace(/\s+/g, '')
                      .includes(query.toLowerCase().replace(/\s+/g, ''))
              );

    return (
        <div>
            <Label name={name} label={label} />
            <Combobox value={selected} onChange={handleOptionChange}>
                <div className="relative mt-1">
                    <div
                        className={`relative shadow appearance-none py-2 px-3 text-text_02 leading-tight text-left w-full sm:w-full md:w-3/4 lg:w-full rounded-md border focus:outline-none border-brd_g_400 text-sm font-medium hover:border-vfAquaBlue focus:shadow-outline focus:border-vfAquaBlue focus:border-transparent transition duration-300 ${disabled ? 'bg-brd_g_200 text-brd_g_400 cursor-not-allowed' : 'bg-vfWhite'} ${
                            errors[name]
                                ? 'border-support_01'
                                : 'border-brd_g_400 hover:border-vfAquaBlue'
                        }`}
                        disabled={disabled}
                    >
                        <Combobox.Input
                            className="w-full appearance-none border-none font-VodafoneRg text-lg font-normal text-txt_grey focus:ring-0 outline-none"
                            displayValue={(option) => option.label}
                            onChange={handleInputChange}
                            placeholder="Select an option"
                            onFocus={() => setIsOpen(true)}
                        />
                        <Combobox.Button className=" absolute inset-y-0 right-0 flex items-center pr-2">
                            <Search />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {filteredOptions.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredOptions.map((option, index) => (
                                    <Fragment key={option.value}>
                                        <Combobox.Option
                                            className={`text-base block w-full px-4 py-2 text-text_02 transition duration-300 ${
                                                selectedOption && selectedOption.value === option.value ? 'bg-red-500 text-white' : 'bg-white'
                                            }`}
                                            value={option}
                                        >
                                            {({ selected }) => (
                                                <span className="block truncate text-lg pl-2 font-normal font-VodafoneRg text-btn_secondary_hover">
                                                    {option.label}
                                                </span>
                                            )}
                                        </Combobox.Option>
                                        {index !== filteredOptions.length - 1 && <hr className="h-px  rounded ml-5 mr-5 bg-brd_g_300" />}
                                    </Fragment>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
            {errors && errors[name] && (
                <p className="text-support_01 text-xs">{errors[name].message}</p>
            )}
        </div>
    );
};

export default ComboBox;
