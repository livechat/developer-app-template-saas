"use client";

import { useEffect, useState } from "react";
import { App } from "@livechat/developer-sdk";
import { deleteCustomerProfile, fetchCustomers } from "lib/api";
import { Button } from "@livechat/design-system-react-components";
import { useApp, useLiveChatFullscreen } from "@livechat/developer-ui-react";

interface Customer {
  name: string;
  email: string;
  id: string;
}

export default function Page() {
  const { app } = useApp();
  const { widget } = useLiveChatFullscreen();
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [customers, setCustomers] = useState<Customer[]>([]);

  const handleFetchCustomers = async (app: App) => {
    const customers = await fetchCustomers(app);
    const formattedCustomers = Object.keys(customers).map((customer) => ({
      name: customers[customer].default_value.split(";")[0],
      email: customers[customer].default_value.split(";")[1],
      id: customer,
    }));
    setCustomers(formattedCustomers);
    setNotificationsCount(3);
  };

  const handleDeleteCustomerProfile = async (app: App, customerId: string) => {
    await deleteCustomerProfile(app, customerId);
    await handleFetchCustomers(app);
  };

  useEffect(() => {
    widget.setNotificationBadge(notificationsCount);
  }, [widget, notificationsCount]);

  useEffect(() => {
    handleFetchCustomers(app);
  }, [app]);

  return (
    <div>
      <h1>Customers list</h1>
      <table className="customer-list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>ID</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.id}</td>
              <td>
                <Button
                  kind="secondary"
                  onClick={async () =>
                    await handleDeleteCustomerProfile(app, customer.id)
                  }
                >
                  Delete user
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
