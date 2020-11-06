import React from "react";
import { Inertia } from "@inertiajs/inertia";

import AppLayout from "../../shared/AppLayout";
import { Button, Card, Page } from "@shopify/polaris";

const Edit = ({ user, order, orders_path }) => {
  const pageTitle = "Order " + order.name;

  const handleBreadcrumb = () => {
    Inertia.get(orders_path);
  };

  return (
    <Page
      breadcrumbs={[{ content: "Orders", onAction: handleBreadcrumb }]}
      title={pageTitle}
      primaryAction={
        <Button
          primary
          onClick={() => {
            console.log("Clicked!");
          }}
        >
          Do something
        </Button>
      }
    >
      <Card title="This is a card" sectioned>
        <p>This is the show page.</p>
      </Card>
    </Page>
  );
};

Edit.layout = (page) => <AppLayout children={page} />;

export default Edit;
