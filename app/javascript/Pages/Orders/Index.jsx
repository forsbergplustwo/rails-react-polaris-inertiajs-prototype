import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import AppLayout from "../../shared/AppLayout";
import {
  Avatar,
  Card,
  Page,
  ResourceList,
  ResourceItem,
  TextStyle,
} from "@shopify/polaris";

const Index = ({ user, orders, sort }) => {
  const [sortValue, setSortValue] = useState("desc");

  function handleSortChange(selected) {
    setSortValue(selected);
    Inertia.get("/orders?sort=" + selected, { only: ["orders"] });
  }

  useEffect(() => {
    setSortValue(sort);
  }, [sort]);

  return (
    <Page title="Orders">
      <Card>
        <Card.Section title="Orders">
          <ResourceList
            resourceName={{ singular: "order", plural: "orders" }}
            items={orders}
            sortValue={sortValue}
            sortOptions={[
              { label: "Newest", value: "desc" },
              { label: "Oldest", value: "asc" },
            ]}
            onSortChange={handleSortChange}
            renderItem={(order) => {
              const {
                id,
                name,
                edit_url,
                created_at,
                customer_name,
                customer_location,
              } = order;
              const media = (
                <Avatar
                  size="medium"
                  name={name}
                  initials={customer_name.charAt(0)}
                />
              );
              return (
                <ResourceItem
                  verticalAlignment="center"
                  id={id}
                  onClick={(e) => Inertia.get(edit_url)}
                  media={media}
                  accessibilityLabel={`View details for Order ${name}`}
                >
                  <h3>
                    <TextStyle variation="strong">
                      {name} - {customer_name}
                    </TextStyle>
                  </h3>
                  <div>{created_at}</div>
                  <div>{customer_location}</div>
                </ResourceItem>
              );
            }}
          />
        </Card.Section>
      </Card>
    </Page>
  );
};

Index.layout = (page) => <AppLayout children={page} />;

export default Index;
