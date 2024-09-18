// lib/db.ts

import prisma from './prisma';


export async function updateSitePublished(id:number,published:boolean) {
  const  updatedSite = await prisma.site.update({
    where: { id },
    data: { published },
  });
  return updatedSite;
}

export async function getSites() {
  const sites = await prisma.site.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      tags: true,
    },
  });
  return sites;
}

export async function getSitesQuery() {
  const sites = await prisma.site.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      tags: true,
    },
  });
  return sites;
}


export async function getPublishedSites() {
  const sites = await prisma.site.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      tags: true,
    },
    where:{
      published:true
    }
  });
  return sites;
}
