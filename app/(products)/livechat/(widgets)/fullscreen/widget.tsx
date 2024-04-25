"use client";

import { useEffect, useState } from "react";
import { Button } from "@livechat/design-system-react-components";
import { useLiveChatFullscreen } from "@livechat/developer-ui-react";
import { Customer } from "@prisma/client";
import { deleteCustomer } from "prisma/api";

interface WidgetProps {
  customers: Customer[];
}

export default function Widget(props: WidgetProps) {
  const { widget } = useLiveChatFullscreen();
  const [customers, setCustomers] = useState(props.customers);

  useEffect(() => {
    widget.setNotificationBadge(customers.length);
  }, [widget, customers]);

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
                  onClick={async () => {
                    await deleteCustomer(customer.id);

                    setCustomers((prevState) =>
                      prevState.filter((cus) => cus.id !== customer.id)
                    );
                  }}
                >
                  Delete customer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
