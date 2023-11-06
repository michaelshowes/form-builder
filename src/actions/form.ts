'use server';

import { db } from '@/lib/db';
import { FormSchemaType, formSchema } from '@/schemas/form';
import { currentUser } from '@clerk/nextjs';

export async function GetFormStats() {
  const user = await currentUser();

  if (!user) {
    throw new Error('User not found');
  }

  const stats = await db.form.aggregate({
    where: {
      userId: user.id
    },
    _sum: {
      visits: true,
      submissions: true
    }
  });

  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;

  let submissionRate = 0;
  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return {
    visits,
    submissions,
    submissionRate,
    bounceRate
  };
}

export async function CreateForm(data: FormSchemaType) {
  const validation = formSchema.safeParse(data);

  if (!validation.success) {
    throw new Error('Form not valid');
  }

  const user = await currentUser();
  if (!user) {
    throw new Error('User not found');
  }

  const { name, description } = data;

  const form = await db.form.create({
    data: {
      userId: user.id,
      name,
      description
    }
  });

  if (!form) {
    throw new Error('Form not created');
  }

  return form.id;
}

export async function GetForms() {
  const user = await currentUser();

  if (!user) {
    throw new Error('User not found');
  }

  return await db.form.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function GetFormById(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new Error('User not found');
  }

  return await db.form.findUnique({
    where: {
      userId: user.id,
      id
    }
  });
}

export async function UpdateFormContent(id: number, content: string) {
  const user = await currentUser();

  if (!user) {
    throw new Error('User not found');
  }

  return await db.form.update({
    where: {
      userId: user.id,
      id
    },
    data: {
      content
    }
  });
}

export async function PublishForm(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new Error('User not found');
  }

  return await db.form.update({
    data: {
      published: true
    },
    where: {
      userId: user.id,
      id
    }
  });
}

export async function GetFormContentByUrl(formUrl: string) {
  return await db.form.update({
    select: {
      content: true
    },
    data: {
      visits: {
        increment: 1
      }
    },
    where: {
      shareURL: formUrl
    }
  });
}

export async function SubmitForm(formUrl: string, content: string) {
  return await db.form.update({
    data: {
      submissions: {
        increment: 1
      },
      FormSubmissions: {
        create: {
          content
        }
      }
    },
    where: {
      shareURL: formUrl,
      published: true
    }
  });
}

export async function GetFormWithSubmissions(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new Error('User not found');
  }

  return await db.form.findUnique({
    where: {
      userId: user.id,
      id
    },
    include: {
      FormSubmissions: true
    }
  });
}
