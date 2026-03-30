import { fireEvent, render, screen } from '@testing-library/react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from '@/components/ui/sidebar';

describe('ui sidebar components', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    Object.defineProperty(window, 'ResizeObserver', {
      writable: true,
      value: class {
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    });
  });

  it('renders and toggles sidebar primitives', () => {
    render(
      <SidebarProvider defaultOpen={true}>
        <Sidebar>
          <SidebarHeader>
            <SidebarInput placeholder="Search" />
            <SidebarTrigger aria-label="toggle sidebar" />
            <SidebarRail />
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>
              <SidebarGroupAction aria-label="group action">+</SidebarGroupAction>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive tooltip="Dashboard">Dashboard</SidebarMenuButton>
                    <SidebarMenuAction aria-label="menu action">*</SidebarMenuAction>
                    <SidebarMenuBadge>3</SidebarMenuBadge>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton variant="outline" size="lg">Reports</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuSkeleton showIcon />
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton href="#sub">Sub Item</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
          </SidebarContent>

          <SidebarFooter>Footer</SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <div>Inset Content</div>
        </SidebarInset>
      </SidebarProvider>
    );

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Inset Content')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('toggle sidebar'));
    fireEvent.keyDown(window, { key: 'b', ctrlKey: true });
  });

  it('renders non-collapsible sidebar variant', () => {
    render(
      <SidebarProvider>
        <Sidebar collapsible="none">
          <SidebarHeader>Static Header</SidebarHeader>
          <SidebarContent>Static Content</SidebarContent>
        </Sidebar>
      </SidebarProvider>
    );

    expect(screen.getByText('Static Header')).toBeInTheDocument();
    expect(screen.getByText('Static Content')).toBeInTheDocument();
  });
});
