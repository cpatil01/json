import ComboBox from '../common/ComboBox';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '../common/button';
import { TEXT_KEYS } from '../../utils/textKeys';

const schema = yup.object().shape({
    place: yup.string().required(TEXT_KEYS.RAISED_TICKET.SELECT_OPTION),
    location: yup.string().required(TEXT_KEYS.RAISED_TICKET.SELECT_OPTION),
});

const LocationSettingsForm = () => {
    const {
        register,
        setValue,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [open, setOpen] = useState(false);
    const onSubmit = () => {
        console.log('Selected city:', selectPlace);
        console.log('Selected location:', selectLocation);
    };
    const selectPlace = watch('place');
    const selectLocation = watch('location');


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full h-full bg-btn_tertiary_hover"
        >
            <div className="relative max-w-lg mx-auto w-full rounded-lg bg-text_01 flex h-full justify-content-center flex-col md:lg:mt-[96px] md:h-[27.75rem] lg:h-auto p-4 md:lg:max-h-lg max-sm:w-full max-md:w-3/4 max-md:max-lg:w-1/2 md:lg:bg-vfWhite sm:mt-0 md:m-auto lg:m-auto max-sm:bg-btn_tertiary_hover">
                <div className="sm:w-full">
                    <label className='sm:mt-5 font-VodafoneRg font-normal text-sm text-btn_secondary_hover'>
                        Select city
                    </label>
                    <div className="md:pl-[6.5rem] lg:pl-[6.5rem] mt-[32px] max-sm:mt-[-8px] lg:w-[377px]">
                        <ComboBox
                            className="mt-[2.25rem]"
                            name="place"
                            register={register}
                            errors={errors}
                            disabled={false}
                            options={[
                                { value: null, label: 'Select an option' },
                                { value: 'Pune', label: 'Pune' },
                            ]}
                            selectedOption={selectPlace}
                            onChangeValue={setValue}
                        />
                    </div>

                    <div className='max-sm:mt-5'>
                        <label className=' font-VodafoneRg font-normal text-sm text-btn_secondary_hover'>
                            Select location
                        </label>
                        <div className="md:pl-[6.5rem] lg:pl-[6.5rem] mt-[32px] max-sm:mt-[-8px] lg:w-[377px]">
                            <ComboBox
                                className="mt-[2.25rem] "
                                name="location"
                                register={register}
                                errors={errors}
                                disabled={false}
                                options={[
                                    { value: null, label: 'Select an option' },
                                    { value: 'EON free zone, Cluster D, 1ST floor', label: 'EON free zone, Cluster D, 1ST floor' },
                                    { value: 'EON free zone, Cluster D, 2nd floor', label: 'EON free zone, Cluster D, 2nd floor' },
                                    { value: 'Mantri- Vodafone International Office 1', label: 'Mantri- Vodafone International Office 1' },
                                    { value: 'Mantri- Vodafone International Office 2', label: 'Mantri- Vodafone International Office 2' },
                                    { value: 'SP Infocity, Phursungi, Pune 1', label: 'SP Infocity, Phursungi, Pune 1' },
                                    { value: 'SP Infocity, Phursungi, Pune 2', label: 'SP Infocity, Phursungi, Pune 2' },
                                ]}
                                selectedOption={selectLocation}
                                onChangeValue={setValue}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex place-content-center max-sm:mt-auto mt-[16px] md:mt-[44px] lg:mt-[44px] ">
                    <Button
                        onClick={() => setOpen(true)}
                        variant="submitClass"
                        className={`w-full md:w-[120px] lg:w-[120px] h-11 bg-btn_submit rounded-md }`}
                    >
                        <p className=" text-center text-white text-lg font-semibold font-VodafoneLt">
                            {TEXT_KEYS.ASSET_VERIFICATION.SUBMIT}
                        </p>
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default LocationSettingsForm;
