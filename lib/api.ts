export interface Customer {
  id: string
  name: string
  email?: string
}

export function getCustomers(): Customer[] {
  if (!localStorage.length) {
    return [];
  }
  const customers: Customer[] = [];

  Object.keys(localStorage).forEach((key) => {
    const customer = JSON.parse(localStorage.getItem(key) as string);
    if (customer.name && customer.email) {
      customers.push({ id: key, name: customer.name, email: customer.email });
    }
  });

  return customers;
}

export function saveCustomer(customer: Customer): void {
  localStorage.setItem(customer.id, JSON.stringify({name: customer.name, email: customer.email}));
}

export function deleteCustomer(customerId: string): void {
  localStorage.removeItem(customerId);
}
