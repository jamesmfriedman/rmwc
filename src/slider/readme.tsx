import React from 'react';

import { Docs, DocsExample, DocProps, DocsP } from '@doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import { Slider } from '.';

export default function Readme() {
  return (
    <Docs
      title="Sliders"
      lead="Sliders let users select from a range of values by moving the slider thumb."
      module="@rmwc/slider"
      styles={['@material/slider/dist/mdc.slider.css']}
      docsLink="https://material.io/develop/web/components/input-controls/sliders/"
      examples={examples}
    >
      <DocsP>
        Sliders can be both uncontrolled and controlled. When creating a
        controlled `Slider`, you should be listening to the `onInput` event and
        use `evt.detail.value` to set your new value.
      </DocsP>
      <DocsP>
        Sliders will automatically layout themselves on window resize. If you
        need to manually trigger a layout because the sliders container size
        changed, the simplest way is to trigger a resize event
        `window.dispatchEvent(new Event('resize'));`.
      </DocsP>
      <DocsP>
        **Known Issue** `material-components-web` uses pointer events
        internally. If you are using something below React 16.4, you will see
        unknown attribute errors, however the slider should still work.
      </DocsP>
      <DocsExample label="Uncontrolled">
        <Slider
          onInput={(evt) => console.log(evt)}
          onChange={(evt) => console.log(evt)}
        />
      </DocsExample>
      <DocsExample label="Controlled">
        {function Example() {
          const [value, setValue] = React.useState(50);
          // onInput is required and will fire continuously.
          // onChange is optional and fires at the end of the interaction
          return (
            <Slider
              value={value}
              onChange={(evt) => setValue(evt.detail.value)}
              onInput={(evt) => setValue(evt.detail.value)}
              discrete
              step={1}
            />
          );
        }}
      </DocsExample>
      <DocsExample label="With Markers">
        <Slider discrete displayMarkers min={100} max={200} step={5} />
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[{ displayName: 'Slider', component: Slider }]}
      />
    </Docs>
  );
}

export const galleryExample = (
  <Slider style={{ minWidth: '10rem' }} value={66} onChange={() => {}} />
);
