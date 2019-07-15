export const vehicleTypeFields = {
  type: 1,
  seats: 1,
  trunkSize: 1
};

export const rentalCompanyFields = {
  name: 1,
  perks: 1,
  locationAlias: 1
};

export const locationFields = {
  hours: 1,
  alias: 1,
  rentalCompanyName: 1,
  address: 1,
  timezone: 1
};

export const insuranceFields = {
  name: 1,
  rentalCompanyName: 1,
  dailyRate: 1,
  dailyRateUnit: 1,
  description: 1,
  rentalCompanyId: 1
};

export const vehicleDataTransform = ({
  vehicle,
  vehicleType,
  rentalCompany,
  pickupLocation,
  returnLocation,
  insurance
}) => {
  const {
    //data to reuse
    specialServices,
    dailyRate,
    dailyRateUnit,
    vehicleImage,
    vehicleMake,
    vehicleNote,
    transmission
  } = vehicle;

  const { type, seats, trunkSize } = vehicleType;
  const { perks, locationAlias } = rentalCompany;
  const {
    hours: hours1,
    alias: alias1,
    rentalCompanyName: rentalCompanyName1
  } = pickupLocation;
  const {
    hours: hours2,
    alias: alias2,
    rentalCompanyName: rentalCompanyName2
  } = returnLocation;
  const {
    name: insuranceName,
    rentalCompanyName: rentalCompanyName3,
    dailyRate: insuranceDailyRate,
    dailyRateUnit: insuranceDailyRateUnit,
    description
  } = insurance;

  return {
    specialServices,
    dailyRate,
    dailyRateUnit,
    vehicleImage,
    vehicleMake,
    vehicleNote,
    transmission,
    vehicleType: {
      type,
      seats,
      trunkSize
    },
    rentalCompany: {
      perks,
      locationAlias
    },
    pickupLocation: {
      hours: hours1,
      alias: alias1,
      rentalCompanyName: rentalCompanyName1
    },
    returnLocation: {
      hours: hours2,
      alias: alias2,
      rentalCompanyName: rentalCompanyName2
    },
    insurances: {
      name: insuranceName,
      rentalCompanyName: rentalCompanyName3,
      dailyRate: insuranceDailyRate,
      dailyRateUnit: insuranceDailyRateUnit,
      description
    }
  };
};
