import { useEffect, useRef, useState, useCallback } from 'react';

interface UseListNavigationOptions {
  itemCount: number;
  onSelect?: (index: number) => void;
  enabled?: boolean;
  orientation?: 'vertical' | 'horizontal' | 'grid';
  gridColumns?: number;
}

/**
 * Custom hook for keyboard navigation in lists and grids
 * Supports arrow keys, Home, End, Page Up/Down
 */
export const useListNavigation = (options: UseListNavigationOptions) => {
  const {
    itemCount,
    onSelect,
    enabled = true,
    orientation = 'vertical',
    gridColumns = 1,
  } = options;

  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLElement>(null);

  const moveFocus = useCallback((newIndex: number) => {
    if (newIndex < 0 || newIndex >= itemCount) return;
    
    setFocusedIndex(newIndex);
    
    // Focus the element
    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll('[data-list-item]');
      const item = items[newIndex] as HTMLElement;
      if (item) {
        item.focus();
      }
    }
  }, [itemCount]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (orientation === 'grid') {
          moveFocus(Math.min(focusedIndex + gridColumns, itemCount - 1));
        } else if (orientation === 'vertical') {
          moveFocus(focusedIndex < itemCount - 1 ? focusedIndex + 1 : focusedIndex);
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (orientation === 'grid') {
          moveFocus(Math.max(focusedIndex - gridColumns, 0));
        } else if (orientation === 'vertical') {
          moveFocus(focusedIndex > 0 ? focusedIndex - 1 : 0);
        }
        break;

      case 'ArrowRight':
        event.preventDefault();
        if (orientation === 'horizontal' || orientation === 'grid') {
          moveFocus(focusedIndex < itemCount - 1 ? focusedIndex + 1 : focusedIndex);
        }
        break;

      case 'ArrowLeft':
        event.preventDefault();
        if (orientation === 'horizontal' || orientation === 'grid') {
          moveFocus(focusedIndex > 0 ? focusedIndex - 1 : 0);
        }
        break;

      case 'Home':
        event.preventDefault();
        moveFocus(0);
        break;

      case 'End':
        event.preventDefault();
        moveFocus(itemCount - 1);
        break;

      case 'PageDown':
        event.preventDefault();
        moveFocus(Math.min(focusedIndex + 10, itemCount - 1));
        break;

      case 'PageUp':
        event.preventDefault();
        moveFocus(Math.max(focusedIndex - 10, 0));
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        if (focusedIndex >= 0 && onSelect) {
          onSelect(focusedIndex);
        }
        break;
    }
  }, [enabled, focusedIndex, itemCount, orientation, gridColumns, moveFocus, onSelect]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enabled) return;

    container.addEventListener('keydown', handleKeyDown as any);
    return () => container.removeEventListener('keydown', handleKeyDown as any);
  }, [enabled, handleKeyDown]);

  return {
    containerRef,
    focusedIndex,
    setFocusedIndex,
    moveFocus,
  };
};
