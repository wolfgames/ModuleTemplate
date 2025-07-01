import { FC, forwardRef, useCallback, useEffect, useImperativeHandle } from 'react';
import { ModuleResult, ModuleResultType, OperationHandle } from 'module-kit';
import { ModuleConfig } from './configuration';
import { ModuleOperation } from './operation';

type Props = {
  config: ModuleConfig;
  result: (result: ModuleResult) => void;
  ready: () => void;
}

const Component = forwardRef<OperationHandle<ModuleOperation>, Props>(({ config, result, ready }, ref) => {
  useImperativeHandle(ref, () => ({
    onOperation: () => {},
    onCancel: () => {},
    onAspectValueChange: () => {},
  }), []);

  useEffect(() => {
    ready();
  }, [ready]);

  const reportExecutionResult = useCallback(() => {
    if (config.expectedResultType === ModuleResultType.Attempt) {
      result({
        type: ModuleResultType.Attempt,
        data: 1,
        actions: [],
      });
    }

    if (config.expectedResultType === ModuleResultType.Choice) {
      result({
        type: ModuleResultType.Choice,
        data: 0,
        actions: [],
      });
    }
  }, [config, result]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      reportExecutionResult();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [reportExecutionResult]);

  return <p>Hello World</p>;
});

export default Component;