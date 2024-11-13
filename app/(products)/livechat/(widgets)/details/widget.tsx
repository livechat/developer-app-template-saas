"use client";

import { Fragment, useState } from "react";
import { Button, Card } from "@livechat/design-system-react-components";
import { useApp, useLiveChatDetails } from "@livechat/developer-ui-react";
import { Customer, deleteCustomer, getCustomers, saveCustomer } from "lib/api";


export default function Widget() {
  const { app } = useApp();
  const { customerProfile } = useLiveChatDetails();

  const [customers, setCustomers] = useState<Customer[]>(getCustomers());

  const customer = customers.find(
    (customer) => customer.id.toString() === customerProfile?.id
  );

  return (
    <div>
      <Card title="Customer profile">
        {customerProfile ? (
          <Fragment>
            <ul>
              <li>Name: {customerProfile.name}</li>
              <li>Email: {customerProfile.email}</li>
              <li>Country: {customerProfile.geolocation.country}</li>
              <li>Timezone: {customerProfile.geolocation.timezone}</li>
              <li>ID: {customerProfile.id}</li>
            </ul>
            {customer ? (
              <Button
                kind="primary"
                onClick={async () => {
                  await deleteCustomer(customer.id).catch(() =>
                    app.features.reports.sendError(
                      "5xx",
                      "Delete customer failed"
                    )
                  );

                  setCustomers((prevState) =>
                    prevState.filter((cus) => cus.id !== customer.id)
                  );
                }}
              >
                Delete customer
              </Button>
            ) : (
              <Button
                kind="primary"
                onClick={async () => {
                  if (!customerProfile) {
                    return;
                  }

                  const newCustomer = {
                    id: customerProfile.id,
                    name: customerProfile.name,
                    email: customerProfile?.email,
                  };

                  saveCustomer(newCustomer)

                  setCustomers((prevState) => [...prevState, newCustomer]);
                }}
              >
                Save customer
              </Button>
            )}
          </Fragment>
        ) : (
          "Loading customer profile"
        )}
      </Card>
    </div>
  );
}
