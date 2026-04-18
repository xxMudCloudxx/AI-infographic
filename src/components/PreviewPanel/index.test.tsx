import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PreviewPanel } from './index';
import { useStore } from '../../store/useStore';

const renderMock = vi.fn();
const destroyMock = vi.fn();

vi.mock('@antv/infographic', () => ({
  Infographic: class {
    render = renderMock;
    destroy = destroyMock;
    toDataURL = vi.fn();
  },
}));

describe('PreviewPanel', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    renderMock.mockClear();
    destroyMock.mockClear();
    useStore.setState({
      currentDsl: 'infographic list',
      viewMode: 'source',
    });
  });

  it('lets users edit the DSL directly in source mode', async () => {
    const user = userEvent.setup();

    render(<PreviewPanel />);

    const editor = screen.getByRole('textbox', { name: 'DSL source editor' });
    await user.clear(editor);
    await user.type(editor, 'infographic updated');

    expect(useStore.getState().currentDsl).toBe('infographic updated');
  });

  it('renders the edited DSL after switching back to preview', async () => {
    const user = userEvent.setup();

    render(<PreviewPanel />);

    const editor = screen.getByRole('textbox', { name: 'DSL source editor' });
    await user.clear(editor);
    await user.type(editor, 'infographic live-preview');
    await user.click(screen.getByRole('button', { name: '预览' }));

    await waitFor(() => {
      expect(renderMock).toHaveBeenLastCalledWith('infographic live-preview');
    });
  });
});
