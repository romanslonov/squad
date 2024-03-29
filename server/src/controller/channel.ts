import { DefaultContext } from 'koa';
import { OK, CREATED } from 'http-status';
import { Channel } from '../entity/Channel';
import { User } from '../entity/User';
import { Message } from '../entity/Message';
import { EventType } from '../event';
import { getEventManager } from '../service/eventManager';

export async function create(ctx: DefaultContext) {
  const { userIds } = ctx.request.body;
  const channel = new Channel();
  channel.author = ctx.state.user;
  const users = await User.findByIds(userIds);
  channel.users = [channel.author, ...users];

  const saved = await channel.save();

  const newChannel = await Channel.findOne({
    where: { id: saved.id },
    relations: ['messages', 'messages.user'],
  });

  getEventManager().emit(EventType.CHANNEL_NEW, { userIds, channel: newChannel, io: ctx.state.io });

  ctx.status = CREATED;
  ctx.body = { channel: newChannel };
}

export async function getAll(ctx: DefaultContext) {
  const user = await User.findOne({
    where: { id: ctx.state.user.id },
    relations: ['channels'],
  });

  ctx.status = OK;
  ctx.body = { channels: user.channels };
}

export async function getMessagesByChannel(ctx: DefaultContext) {
  const { id } = ctx.params;
  const { limit = 25, page = 1 } = ctx.request.query;
  const [messages, totalCount] = await Message.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
    where: [{ channel: id }],
    relations: ['user'],
  });

  ctx.status = OK;
  ctx.body = {
    messages,
    meta: {
      totalCount,
      currentCount: messages.length,
      currentPage: Number(page),
      totalPages: Math.ceil(totalCount / limit)
    },
  };
}

export async function typing(ctx: DefaultContext) {
  const { id } = ctx.params;
  getEventManager().emit(EventType.CHANNEL_TYPING, {
    userId: ctx.state.user.id,
    channelId: id,
    io: ctx.state.io,
  });
  ctx.status = 204;
}
