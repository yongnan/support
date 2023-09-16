# Configuration

```
yarn create react-app mui-treasury-layout-v5 --template typescript
yarn add @mui/material@next @mui/icons-material@next @emotion/styled @emotion/react @mui-treasury/layout@next @mui-treasury/mockup@next
```

## Feature

Auto-collapse supports only `Persistent` & `Permanent` EdgeSidebar if they are configure to be collapsible.

|           | xs   | sm   | md   | lg   | xl   |
| --------- | ---- | ---- | ---- | ---- | ---- |
| collapsed | ✅    | ✅    | ✅    | ✘    | ✘    |



# Layout

full source code

```tsx
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { 
  Box, IconButton, ButtonBase, Container  
} from "@mui/material";
import { 
  Root, Header, EdgeSidebar, EdgeTrigger, SidebarContent,
  Content, Footer
} from "@mui-treasury/layout";

import { Menu } from "@mui/icons-material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

function App(): JSX.Element {
  return (
    <Root
      scheme={{
        header: {
          config: {
            xs: {
              position: "sticky",
              height: 56,
            },
            md: {
              position: "relative",
              height: 64,
              clipped: true, // Let the header takes all the space at the top. 
            },
          },
        },
        leftEdgeSidebar: {
          config: {
            xs: {
              variant: "temporary",
              width: "auto",
            },
            md: {
              variant: "permanent",
              width: 256,
              collapsible: true,
              collapsedWidth: 64,
            },
          },
        },
    }}
    >
      <CssBaseline />
      <Header>
        <Box
          sx={{ flex: 1, display: "flex", alignItems: "center", px: 2, gap: 1 }}
        >
          <EdgeTrigger target={{ anchor: "left", field: "open" }}>
            {(open: boolean, setOpen: (a: boolean)=>void) => (
              <IconButton onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowLeft /> : <Menu />}
              </IconButton>
            )}
          </EdgeTrigger>
          Header
        </Box>
      </Header>
      <EdgeSidebar anchor="left">
        <SidebarContent>
          Sidbar content
        </SidebarContent>
          <EdgeTrigger target={{ anchor: "left", field: "collapsed" }}>
            {(collapsed: boolean, setCollapsed: (a: boolean)=>void) => (
              <ButtonBase
                onClick={() => setCollapsed(!collapsed)}
                sx={{
                  minHeight: 40,
                  width: "100%",
                  bgcolor: "grey.100",
                  borderTop: "1px solid",
                  borderColor: "grey.200",
                }}
              >
                {collapsed ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              </ButtonBase>
            )}
          </EdgeTrigger>  
      </EdgeSidebar>
      <Content>
        content
      </Content>
      <Footer>
        footer
      </Footer>
    </Root>
  );
}

export default App;
```



## Mockup (optional)

package.json

```json
  "dependencies": {
  	...
    "@mui-treasury/mockup": "^5.0.0-alpha.15",

```

App.tsx

```tsx
...
import {HeaderMockup, NavSidebarMockup, ContentMockup, FooterMockup
} from "@mui-treasury/mockup/layout";

<Header>
  ...
	<HeaderMockup />
	...
</Header>

<SidebarContent>
  <Box sx={{ maxWidth: 256 }}>
    <NavSidebarMockup />
  </Box>
</SidebarContent>

<Content>
  <Container maxWidth="sm">
    <ContentMockup />
  </Container>
</Content>

<Footer>
  <FooterMockup />
</Footer>

```

