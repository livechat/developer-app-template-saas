"use client";

import { Fragment, useEffect, useState } from "react";
import { Button, Card } from "@livechat/design-system-react-components";
import {
  deleteCustomerProfile,
  fetchCustomers,
  saveCustomerProfile,
} from "lib/api";
import { useApp, useLiveChatDetails } from "@livechat/developer-ui-react";

export interface CustomerProfile {
  [key: string]: {
    default_value: string;
  };
}

export default function LiveChatChatDetails() {
  const { app } = useApp();
  const { customerProfile } = useLiveChatDetails();
  const [customers, setCustomers] = useState<CustomerProfile>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCustomerProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCustomerProfiles = async () => {
    const customers = await fetchCustomers(app);
    setCustomers(customers);
  };

  const handleSaveCustomerProfile = async () => {
    if (!customerProfile) {
      return;
    }

    setIsLoading(true);
    await saveCustomerProfile(app, customerProfile);
    await fetchCustomerProfiles();
    setIsLoading(false);
  };

  const handleDeleteCustomerProfile = async () => {
    if (!customerProfile) {
      return;
    }

    setIsLoading(true);
    await deleteCustomerProfile(app, customerProfile.id);
    await fetchCustomerProfiles();
    setIsLoading(false);
  };

  const customerExists = customerProfile && customerProfile?.id in customers;

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
            <Button
              loading={isLoading}
              kind="primary"
              onClick={
                customerExists
                  ? handleDeleteCustomerProfile
                  : handleSaveCustomerProfile
              }
            >
              {customerExists ? "Delete customer" : "Save customer"}
            </Button>
          </Fragment>
        ) : (
          "Loading customer profile"
        )}
      </Card>
    </div>
  );
}
