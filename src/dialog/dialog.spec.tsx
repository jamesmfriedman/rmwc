import React from 'react';
import { mount } from 'enzyme';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton,
  SimpleDialog,
  createDialogQueue,
  DialogQueue
} from './';
import { wait, actWait } from '@rmwc/base/utils/test-utils';
import { act } from 'react-dom/test-utils';

describe('Dialog', () => {
  it('simple Dialog renders', () => {
    mount(
      <SimpleDialog
        title="This is a simple dialog"
        header="Foo"
        body="You can pass the body prop, or anything you want as children."
        open
        onClose={(evt) => {}}
      />
    );
  });

  it('simple Dialog renders with no children', () => {
    mount(
      <SimpleDialog
        title="This is a simple dialog"
        open
        onClose={(evt) => {}}
      />
    );
  });

  it('simple Dialog renders with children', () => {
    mount(
      <SimpleDialog title="This is a simple dialog" open onClose={(evt) => {}}>
        Hello
      </SimpleDialog>
    );
  });

  // SKIP broken
  // it('Dialog lifecycle', async () => {
  //   let open = 0;
  //   let opened = 0;
  //   let close = 0;
  //   let closed = 0;

  //   const el = mount(
  //     <Dialog
  //       onOpen={() => open++}
  //       onOpened={() => opened++}
  //       onClose={() => {
  //         close++;
  //         el.setProps({ open: false });
  //       }}
  //       onClosed={() => closed++}
  //     >
  //       <DialogTitle>Dialog Title</DialogTitle>

  //       <DialogContent>This is a custom dialog.</DialogContent>
  //       <DialogActions>
  //         <DialogButton action="close">Cancel</DialogButton>
  //         <DialogButton action="accept">Sweet!</DialogButton>
  //       </DialogActions>
  //     </Dialog>
  //   );

  //   el.setProps({ open: true });
  //   await wait(250);

  //   const acceptButton = el.find('button.mdc-dialog__button').last();
  //   acceptButton.simulate('click');

  //   await wait(250);
  //   el.setProps({ open: true });
  //   await wait(250);
  //   const cancelButton = el.find('button.mdc-dialog__button').first();
  //   cancelButton.simulate('click');
  //   await wait(250);
  //   expect(open).toBe(2);
  //   expect(opened).toBe(2);
  //   expect(close).toBe(2);
  //   expect(closed).toBe(2);
  // });

  it('standard Dialog renders', () => {
    const el = mount(
      <Dialog open onClose={(evt) => {}}>
        <DialogTitle>Dialog Title</DialogTitle>

        <DialogContent>This is a custom dialog.</DialogContent>
        <DialogActions>
          <DialogButton action="close">Cancel</DialogButton>
          <DialogButton action="accept">Sweet!</DialogButton>
        </DialogActions>
      </Dialog>
    );

    el.unmount();
  });
});

describe('DialogQueue', () => {
  it('renders', () => {
    const queue = createDialogQueue();
    const el = mount(<DialogQueue dialogs={queue.dialogs} />);
    el.unmount();
  });

  it('alerts and accepts', async () => {
    const queue = createDialogQueue();
    const el = mount(<DialogQueue dialogs={queue.dialogs} />);

    queue.alert({ title: 'myAlert' }).then(async (resp) => {
      expect(resp).toBe('accept');

      // wait for cleanup
      await wait(200);
    });

    await wait();
    el.update();

    expect(el.html().includes('myAlert')).toBe(true);
    await wait(100);

    el.find('.mdc-dialog__button').first().simulate('click');
  });

  it('alerts and closes', (done) => {
    const queue = createDialogQueue();
    const el = mount(<DialogQueue dialogs={queue.dialogs} />);
    queue.alert({ title: 'myAlert' }).then((resp) => {
      expect(resp).toBe('close');
      done();
    });

    setTimeout(() => {
      el.update();

      el.find('.mdc-dialog__scrim').first().simulate('click');
    });
  });

  it('confirms and returns true', async () => {
    const queue = createDialogQueue();
    const el = mount(<DialogQueue dialogs={queue.dialogs} />);
    queue.confirm({ title: 'myConfirm' }).then((resp) => {
      expect(resp).toBe(true);
    });

    await wait();
    el.update();
    expect(el.html().includes('myConfirm')).toBe(true);

    el.find('[action="accept"]').first().simulate('click');
  });

  it('confirms and returns false', async () => {
    const queue = createDialogQueue();
    const el = mount(<DialogQueue dialogs={queue.dialogs} />);
    queue.confirm({ title: 'myConfirm' }).then((resp) => {
      expect(resp).toBe(false);
    });

    await wait();
    el.update();

    el.find('[action="close"]').first().simulate('click');
  });

  it('prompts and returns value', async () => {
    const queue = createDialogQueue();
    const el = mount(<DialogQueue dialogs={queue.dialogs} />);

    queue.prompt({ title: 'myPrompt' }).then((resp) => {
      expect(resp).toBe('WORKING');
    });

    el.update();
    expect(el.html().includes('myPrompt')).toBe(true);

    (el.find('input').prop('onChange') as any)({
      currentTarget: { value: 'WORKING' }
    });

    el.update();
    await wait();

    el.find('[action="accept"]').first().simulate('click');
  });

  it('prompts and returns null', (done) => {
    const queue = createDialogQueue();
    const el = mount(<DialogQueue dialogs={queue.dialogs} />);
    queue.prompt({ title: 'myPrompt', body: 'CUSTOM BODY' }).then((resp) => {
      expect(resp).toBe(null);
      done();
    });

    el.update();

    expect(el.html().includes('CUSTOM BODY')).toBe(true);

    el.find('[action="close"]').first().simulate('click');
  });

  it('supports onClose', (done) => {
    const queue = createDialogQueue();
    const el = mount(<DialogQueue dialogs={queue.dialogs} />);
    const onClose = jest.fn();
    queue.alert({ onClose });

    el.update();

    setTimeout(() => {
      el.find('.mdc-dialog__button').first().simulate('click');

      expect(onClose).toHaveBeenCalled();
      done();
    });
  });
});
