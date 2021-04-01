import { Request, Response } from 'express';

import https from 'https';

class ItemController {
  index(req: Request, res: Response) {
    const { id } = req.params;
    const { enchantmentLevel = 0 } = req.query;

    try {
      https
        .request(
          `https://gameinfo.albiononline.com/api/gameinfo/items/${id}/data`,
          request => {
            let json = '';
            request.on('data', data => {
              json += data;
            });

            request.on('end', () => {
              const {
                uniqueName,
                enchantments,
                localizedNames,
                localizedDescriptions,
              } = JSON.parse(json);

              res.status(200).json({
                uniqueName,
                enchantmentLevel,
                enchantments:
                  enchantments?.enchantments?.reduce(
                    (levels: Array<number>, level: Record<string, number>) => [
                      ...levels,
                      level.enchantmentLevel,
                    ],
                    [],
                  ) || [],
                localizedNames,
                localizedDescriptions,
              });
            });
          },
        )
        .end();
    } catch (error) {
      /* */
    }
  }
}

export default new ItemController();
