import React from 'react';

import { Docs, DocsExample, DocProps, DocsSubtitle, DocsP } from '@doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import {
  Snackbar,
  SnackbarAction,
  createSnackbarQueue,
  SnackbarQueue
} from './';
import { Button } from '@rmwc/button';

export default function Readme() {
  return (
    <Docs
      title="Snackbars"
      lead="Snackbars provide brief feedback about an operation through a message at the bottom of the screen."
      module="@rmwc/snackbar"
      styles={[
        '@material/snackbar/dist/mdc.snackbar.css',
        '@material/button/dist/mdc.button.css',
        '@material/ripple/dist/mdc.ripple.css'
      ]}
      docsLink="https://material.io/develop/web/components/snackbars/"
      examples={examples}
    >
      <DocsSubtitle>Basic Usage</DocsSubtitle>
      <DocsP>
        You can render a snackbar in your UI and control its open state.
      </DocsP>
      <DocsExample label="Default">
        {function Example() {
          const [open, setOpen] = React.useState(false);

          return (
            <>
              <Snackbar
                open={open}
                onClose={(evt) => setOpen(false)}
                message="This is a new message"
                dismissesOnAction
                action={
                  <SnackbarAction
                    label="Dismiss"
                    onClick={() => console.log('Click Me')}
                  />
                }
              />

              <Button
                raised
                label="Show snackbar"
                onClick={(evt) => setOpen(!open)}
              />
            </>
          );
        }}
      </DocsExample>

      <DocsExample label="Start Aligned">
        {function Example() {
          const [open, setOpen] = React.useState(false);

          return (
            <>
              <Snackbar
                open={open}
                onClose={(evt) => setOpen(false)}
                message="Start aligned, open until dismissed"
                stacked
                dismissesOnAction
                action={[
                  <SnackbarAction label="Yeah!" />,
                  <SnackbarAction label="No..." />
                ]}
                leading
                timeout={-1}
              />

              <Button
                raised
                label="Show start-aligned"
                onClick={(evt) => setOpen(!open)}
              />
            </>
          );
        }}
      </DocsExample>

      <DocsSubtitle>Usage with SnackbarQueue</DocsSubtitle>
      <DocsP>
        While rendering the Snackbar inline works for simple cases, you'll
        likely have a notification system, or want to send notifications from
        anywhere in your app. The `SnackbarQueue` exists as a convenient
        interface for handling these cases and rendering the snackbar messages
        for you. If you've used the `DialogQueue`, the `SnackbarQueue` is very
        similar.
      </DocsP>
      <DocsP>
        Setup is nice and easy, create a queue object you can pass around in
        your code base, pass the queues `messages` to the `SnackbarQueue`
        component, and then use the `notify` function to send notifications.
      </DocsP>
      <DocsExample codeOnly>
        {
          /* jsx */ `
        // Create a file that exports your queue
        // myQueue.js
        import { createSnackbarQueue } from '@rmwc/snackbar';

        export const queue = createSnackbarQueue();
      `
        }
      </DocsExample>
      <DocsExample codeOnly>
        {
          /* jsx */ `
        // Somewhere at the top level of your app
        // Render the SnackbarQueue
        import React from 'react';
        import { queue } from './myQueue';

        export default function App() {
          return (
            <div>
              ...
              <SnackbarQueue
                messages={queue.messages}
                // You can also pass default options to pass to your notifications
                // ie, make them all leading, stacked, etc
                leading
                stacked
              />
            </div>
          )
        }
        
      `
        }
      </DocsExample>

      <DocsP>
        The `notify` function was designed to mimic the the built-in browser
        Notifications api and can accept most of the relevant options (icon,
        image, title, body, actions, ,etc). It also can accept any of the
        Snackbar props. Just import your queue, and call the notify method.
      </DocsP>

      <DocsExample codeOnly>
        {
          /* jsx */ `
        // Somewhere else in your app
        // Could be a view, your redux store, anywhere you want...
        import { queue } from './myQueue';

        // Simple example
        queue.notify({
          title: 'Hi there'
        });

        // With some features
        queue.notify({
          title: <b>Warning</b>,
          body: 'You have selected pizza instead icecream!',
          icon: 'warning',
          actions: [
            {
              // NotificationAction api format
              title: 'Fix It!',
              icon: 'close',
              action: 'fixit' // action will be available as evt.detail.reason in the onClose event
            },
            {
              // OR SnackbarActionProps format
              label: 'Continue...',
              icon: 'check',
              onClick: () => {}
            },
          ]
        });
      `
        }
      </DocsExample>

      <DocsExample label="Inline Example">
        {() => {
          const { messages, notify } = createSnackbarQueue();

          function App() {
            return (
              <div>
                <Button
                  label="Notify"
                  onClick={() =>
                    notify({
                      title: <b>Success</b>,
                      body: 'You have selected pizza!',
                      dismissesOnAction: true,
                      icon: 'check',
                      actions: [
                        {
                          title: 'Dismiss'
                        }
                      ]
                    })
                  }
                />
                <SnackbarQueue messages={messages} />
              </div>
            );
          }
          return <App />;
        }}
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[
          { displayName: 'Snackbar', component: Snackbar },
          { displayName: 'SnackbarAction', component: SnackbarAction }
        ]}
      />
    </Docs>
  );
}

export const galleryExample = (
  <Snackbar
    open={true}
    timeout={999999999}
    message="This is a new message"
    style={{ transform: 'scale(0.75)', position: 'static' }}
    action={
      <SnackbarAction label="Dismiss" onClick={() => console.log('Click Me')} />
    }
  />
);
