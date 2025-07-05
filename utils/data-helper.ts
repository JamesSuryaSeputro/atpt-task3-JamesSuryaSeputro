import { faker } from '@faker-js/faker';

export const generateUserData = () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName, provider: 'test.local' });

    return {
        name: `${firstName} ${lastName}`,
        email,
        password: faker.internet.password({ length: 12, prefix: 'P@ss' }),
        title: 'Mr' as 'Mr' | 'Mrs',
        dob: {
            day: faker.number.int({ min: 1, max: 28 }),
            month: faker.number.int({ min: 1, max: 12 }),
            year: faker.number.int({ min: 1980, max: 2005 }),
        },
        firstName,
        lastName,
        address: faker.location.streetAddress(),
        country: 'United States',
        state: faker.location.state(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode(),
        mobileNumber: faker.phone.number(),
    };
};
