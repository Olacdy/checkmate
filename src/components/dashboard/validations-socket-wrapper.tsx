'use client';

import { FC, HTMLAttributes, useEffect, useState } from 'react';

import ValidationTabs from '@/components/dashboard/validation-tabs';

import { pusherClient } from '@/lib/pusher';
import { toPusherKey } from '@/lib/utils';

import { ValidationType } from '@/schemas/validation-route-schemas';

type BaseValidationsSocketWrapperProps = {
  userId: string;
  initialValidations: ValidationType[];
} & HTMLAttributes<HTMLDivElement>;

type SingleValidationsSocketWrapperProps = {
  type: 'single';
  schemaId: string;
};

type MultipleValidationsSocketWrapperProps = {
  type: 'multiple';
};

type ValidationsSocketWrapperProps = BaseValidationsSocketWrapperProps &
  (SingleValidationsSocketWrapperProps | MultipleValidationsSocketWrapperProps);

const ValidationsSocketWrapper: FC<ValidationsSocketWrapperProps> = ({
  userId,
  initialValidations,
  className,
  ...props
}) => {
  const [validations, setValidations] =
    useState<ValidationType[]>(initialValidations);

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`user:${userId}:update_validations`));

    const updateValidations = (validation: ValidationType) => {
      if (!(props.type === 'single' && props.schemaId !== validation.schemaId))
        setValidations((prev) => [validation, ...prev]);
    };

    pusherClient.bind('update_validations', updateValidations);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${userId}:update_validations`)
      );
      pusherClient.unbind('update_validations', updateValidations);
    };
  }, []);

  return (
    <ValidationTabs
      type={props.type}
      className={className}
      validations={validations}
    />
  );
};

export default ValidationsSocketWrapper;
