
import { faker } from '@faker-js/faker';
import { sample } from 'lodash';


export function userFactory(rest = {}) {
  return {
                            fullname: faker.datatype.string(255),
                    email: faker.internet.email(),
                                                                                              ...rest,
  };
}
export function participantFactory(rest = {}) {
  return {
                            status: faker.datatype.number({"min":-2147483647,"max":2147483646}),
              user_id: faker.datatype.number({}),
              party_id: faker.datatype.number({}),
          ...rest,
  };
}
export function partyFactory(rest = {}) {
  return {
                            name: faker.datatype.string(255),
              address: faker.datatype.string(255),
                    number_of_registrations: faker.datatype.number({"min":-2147483647,"max":2147483646}),
              registered_quantity: faker.datatype.number({"min":-2147483647,"max":2147483646}),
              status_party: faker.datatype.string(255),
                    min_age: faker.datatype.number({"min":-2147483647,"max":2147483646}),
              admin_id: faker.datatype.number({}),
          ...rest,
  };
}
export function adminFactory(rest = {}) {
  return {
                            email: faker.internet.email(),
                                                                                                  role: sample(["admin","superadmin"]),
          ...rest,
  };
}
export function parties2Factory(rest = {}) {
  return {
                            participant_id: faker.datatype.number({}),
          ...rest,
  };
}
export function parties3Factory(rest = {}) {
  return {
                            parties2_id: faker.datatype.number({}),
          ...rest,
  };
}
