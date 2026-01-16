import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { RollingConfig } from '../components/RollingConfig';

const meta = {
  title: 'Components/RollingConfig',
  component: RollingConfig,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof RollingConfig>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: {
      window: 3,
      metrics: [],
    },
    options: ['spend', 'clicks'],
  },
};

export const AllMetricsSelected: Story = {
  args: {
    value: {
      window: 3,
      metrics: ['spend', 'clicks'],
    },
    options: ['spend', 'clicks'],
  },
};