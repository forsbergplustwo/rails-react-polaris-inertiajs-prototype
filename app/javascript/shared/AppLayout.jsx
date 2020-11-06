import React, { useCallback, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import {
  AppProvider,
  Card,
  Heading,
  TextContainer,
  ContextualSaveBar,
  Frame,
  Layout,
  Loading,
  Navigation,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  Toast,
  TopBar,
} from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import { ArrowLeftMinor, HomeMajor, OrdersMajor } from "@shopify/polaris-icons";

export default function AppLayout({ children }) {
  const { user } = usePage().props;

  const [toastActive, setToastActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const handleDiscard = useCallback(() => {
    // handle the Discard
    setIsDirty(false);
  }, []);

  const handleSave = useCallback(() => {
    // handle the Save
    setIsDirty(false);
    setToastActive(true);
  }, []);

  const toggleToastActive = useCallback(
    () => setToastActive((toastActive) => !toastActive),
    []
  );

  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    []
  );

  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );

  const toggleIsLoading = useCallback(
    () => setIsLoading((isLoading) => !isLoading),
    []
  );

  // Setup automatic loading indicators when navigating with Intertia
  let loadingTimeout = null;

  Inertia.on("start", () => {
    loadingTimeout = setTimeout(() => setIsLoading(true), 250);
  });
  Inertia.on("finish", (event) => {
    clearTimeout(loadingTimeout);
    setIsLoading(false);
  });

  const toastMarkup = toastActive ? (
    <Toast onDismiss={toggleToastActive} content="Changes saved" />
  ) : null;

  const userMenuActions = [
    {
      items: [{ content: "Community forums" }],
    },
  ];

  const contextualSaveBarMarkup = isDirty ? (
    <ContextualSaveBar
      message="Unsaved changes"
      saveAction={{
        onAction: handleSave,
      }}
      discardAction={{
        onAction: handleDiscard,
      }}
    />
  ) : null;

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name={user.name}
      detail={user.shop_name}
      initials={user.name.charAt(0)}
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );

  const searchFieldMarkup = <Heading />;

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      onNavigationToggle={toggleMobileNavigationActive}
      searchField={searchFieldMarkup}
    />
  );

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            label: "Back to Shopify",
            icon: ArrowLeftMinor,
          },
        ]}
      />
      <Navigation.Section
        separator
        title="Digital Downloads Pro"
        items={[
          {
            label: "Dashboard",
            icon: HomeMajor,
            onClick: (e) => {
              Inertia.get("/");
            },
          },
          {
            label: "Orders",
            icon: OrdersMajor,
            onClick: (e) => {
              Inertia.get("/orders");
            },
          },
        ]}
        //        action={{
        //          icon: ConversationMinor,
        //          accessibilityLabel: 'Contact support',
        //          onClick: toggleModalActive
        //        }}
      />
    </Navigation>
  );

  const loadingMarkup = isLoading ? <Loading /> : null;

  const actualPageMarkup = <div>{children}</div>;

  const loadingPageMarkup = (
    <SkeletonPage>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <TextContainer>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={9} />
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );

  const pageMarkup = isLoading ? loadingPageMarkup : actualPageMarkup;

  const theme = {
    logo: {
      width: 124,
      topBarSource:
        "https://cdn.shopify.com/s/files/1/0098/7102/files/black-logo.png?v=1548862777",
      contextualSaveBarSource:
        "https://cdn.shopify.com/s/files/1/0098/7102/files/black-logo.png?v=1548862777",
      url: "http://forsbergplustwo.com",
      accessibilityLabel: "FORSBERG+two",
    },
  };

  return (
    <div style={{ height: "500px" }}>
      <AppProvider
        theme={theme}
        i18n={{ enTranslations }}
        features={{ newDesignLanguage: true }}
      >
        <Frame
          topBar={topBarMarkup}
          navigation={navigationMarkup}
          showMobileNavigation={mobileNavigationActive}
          onNavigationDismiss={toggleMobileNavigationActive}
        >
          {contextualSaveBarMarkup}
          {loadingMarkup}
          {pageMarkup}
          {toastMarkup}
        </Frame>
      </AppProvider>
    </div>
  );
}
